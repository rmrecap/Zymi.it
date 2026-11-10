"use client";

import { useSession, signOut } from "next-auth/react";
import { useEffect, useRef } from "react";

// Use 30 seconds for testing
const SESSION_TIMEOUT = 30 * 1000; // 30 seconds for testing

export function useSessionTimeoutTest() {
  const { data: session, status } = useSession();
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    // Only run on client side
    if (typeof window === 'undefined') return;
    
    if (status === "authenticated" && session) {
      console.log('🕐 Session timeout test started - 30 seconds');
      
      const startTimeout = () => {
        // Clear existing timeout
        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current);
        }
        
        // Set new timeout
        timeoutRef.current = setTimeout(() => {
          console.log('🚪 Session expired - signing out');
          signOut({ 
            callbackUrl: "/login?expired=true",
            redirect: true 
          });
        }, SESSION_TIMEOUT);
      };

      // Start the initial timeout
      startTimeout();

      // Reset timeout on user activity (throttled to avoid layout thrashing)
      let lastActivityTime = 0;
      const resetTimeout = () => {
        const now = Date.now();
        if (now - lastActivityTime < 15000) return;
        lastActivityTime = now;
        console.log('🔄 User activity detected - resetting timeout');
        startTimeout();
      };

      // Listen for user activity with passive listeners
      const events = ['mousedown', 'keydown', 'scroll', 'touchstart', 'click'];
      events.forEach(event => {
        window.addEventListener(event, resetTimeout, { passive: true });
      });

      return () => {
        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current);
        }
        events.forEach(event => {
          window.removeEventListener(event, resetTimeout);
        });
      };
    }
  }, [session, status]);
}
