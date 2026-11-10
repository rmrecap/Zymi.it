import "react";

declare module "react" {
  interface FormHTMLAttributes<T> extends HTMLAttributes<T> {
    toolname?: string;
    tooldescription?: string;
    toolautosubmit?: string;
  }
}

declare global {
  interface Navigator {
    modelContext?: {
      tools: Map<string, any>;
      registerTool: (tool: {
        name: string;
        description: string;
        inputSchema: Record<string, any>;
        execute: (params: any) => Promise<any> | any;
      }) => void;
      getTools: () => any[];
      executeTool: (name: string, params: any) => Promise<any> | any;
    };
  }
}
