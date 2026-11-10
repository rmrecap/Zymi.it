"use client";

import { useSession, signOut } from "next-auth/react";
import { useEffect, useRef } from "react";

// Production timeout: 15 minutes
const SESSION_TIMEOUT = 15 * 60 * 1000; // 15 minutes in milliseconds

export function useSessionTimeout() {
  const { data: session, status } = useSession();
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    // Only run on client side
    if (typeof window === 'undefined') return;
    
    if (status === "authenticated" && session) {
      const startTimeout = () => {
        // Clear existing timeout
        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current);
        }
        
        // Set new timeout
        timeoutRef.current = setTimeout(() => {
          signOut({ 
            callbackUrl: "/login?expired=true",
            redirect: true 
          });
        }, SESSION_TIMEOUT);
      };

      // Start the initial timeout
      startTimeout();

      // Reset timeout on user activity (throttled to once every 15 seconds to prevent forced reflows)
      let lastActivityTime = 0;
      const resetTimeout = () => {
        const now = Date.now();
        if (now - lastActivityTime < 15000) return;
        lastActivityTime = now;
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
