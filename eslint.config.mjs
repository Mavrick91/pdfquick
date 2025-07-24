import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";
import js from "@eslint/js";
import typescript from "@typescript-eslint/eslint-plugin";
import typescriptParser from "@typescript-eslint/parser";
import react from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import jsxA11y from "eslint-plugin-jsx-a11y";
import importPlugin from "eslint-plugin-import";
import prettier from "eslint-plugin-prettier";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  // Base configuration
  js.configs.recommended,
  
  // Next.js configurations
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  
  // Global ignores
  {
    ignores: [
      // Dependencies
      "node_modules/**",
      
      // Next.js build output
      ".next/**",
      "out/**",
      
      // Production builds
      "build/**",
      "dist/**",
      
      // TypeScript
      "*.tsbuildinfo",
      "next-env.d.ts",
      
      // Testing
      "coverage/**",
      
      // Cache
      ".eslintcache",
      ".prettiercache",
      
      // Misc
      ".DS_Store",
      "*.pem",
      
      // Vercel
      ".vercel/**",
      
      // Logs
      "npm-debug.log*",
      "yarn-debug.log*",
      "yarn-error.log*",
      
      // Local env files
      ".env*.local",
    ],
  },
  
  // Main configuration for all files
  {
    files: ["**/*.{js,jsx,ts,tsx}"],
    
    plugins: {
      "@typescript-eslint": typescript,
      "react": react,
      "react-hooks": reactHooks,
      "jsx-a11y": jsxA11y,
      "import": importPlugin,
      "prettier": prettier,
    },
    
    languageOptions: {
      parser: typescriptParser,
      parserOptions: {
        ecmaVersion: 2021,
        sourceType: "module",
        ecmaFeatures: {
          jsx: true,
        },
        project: "./tsconfig.json",
      },
      
      globals: {
        // Browser
        window: "readonly",
        document: "readonly",
        navigator: "readonly",
        console: "readonly",
        fetch: "readonly",
        
        // Node
        process: "readonly",
        Buffer: "readonly",
        __dirname: "readonly",
        __filename: "readonly",
        
        // ES2021
        Promise: "readonly",
        Set: "readonly",
        Map: "readonly",
        
        // Next.js
        React: "readonly",
      },
    },
    
    settings: {
      react: {
        version: "detect",
      },
      "import/resolver": {
        typescript: {},
        node: {
          extensions: [".js", ".jsx", ".ts", ".tsx"],
        },
      },
    },
    
    rules: {
      // TypeScript rules
      "@typescript-eslint/consistent-type-definitions": ["error", "type"],
      "@typescript-eslint/explicit-function-return-type": "off",
      "@typescript-eslint/explicit-module-boundary-types": "off",
      "@typescript-eslint/no-unused-vars": ["error"],
      "@typescript-eslint/no-explicit-any": "warn",
      "@typescript-eslint/no-non-null-assertion": "warn",
      
      // React rules
      "react/react-in-jsx-scope": "off",
      "react/prop-types": "off",
      "react/display-name": "off",
      "react/function-component-definition": [
        "error",
        {
          namedComponents: "arrow-function",
          unnamedComponents: "arrow-function",
        },
      ],
      
      // React Hooks rules
      "react-hooks/rules-of-hooks": "error",
      "react-hooks/exhaustive-deps": "warn",
      
      // Import rules
      "import/order": [
        "error",
        {
          groups: ["builtin", "external", "internal", "parent", "sibling", "index"],
          "newlines-between": "always",
          alphabetize: {
            order: "asc",
            caseInsensitive: true,
          },
        },
      ],
      "import/no-unresolved": "off",
      
      // Prettier
      "prettier/prettier": "error",
      
      // General JavaScript rules
      "no-console": ["warn", { allow: ["warn", "error"] }],
      "prefer-const": "error",
      "no-var": "error",
      "object-shorthand": "error",
      "prefer-arrow-callback": "error",
      "prefer-template": "error",
      "prefer-destructuring": ["error", { object: true, array: false }],
      "no-duplicate-imports": "error",
    },
  },
];

export default eslintConfig;
