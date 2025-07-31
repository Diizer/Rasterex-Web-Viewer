import js from "@eslint/js";
import tsEslintPlugin from "@typescript-eslint/eslint-plugin";
import tsEslintParser from "@typescript-eslint/parser";
import unusedImports from "eslint-plugin-unused-imports";

export default [
  js.configs.recommended,
  {
    ignores: [
      // Dependencies
      "node_modules/**",
      "dist/**",
      "build/**",
      
      // Generated files
      "*.d.ts",
      "*.js.map",
      "*.css.map",
      
      // Angular specific
      "src/assets/**",
      "src/rxcore/**",
      
      // Build artifacts
      ".angular/**",
      ".cache/**",
      
      // IDE files
      ".vscode/**",
      ".idea/**",
      
      // OS files
      ".DS_Store",
      "Thumbs.db",
      
      // Logs
      "*.log",
      "npm-debug.log*",
      "yarn-debug.log*",
      "yarn-error.log*",
      
      // Runtime data
      "pids",
      "*.pid",
      "*.seed",
      "*.pid.lock",
      
      // Coverage directory
      "coverage/**",
      "*.lcov",
      ".nyc_output",
      
      // Dependency directories
      "jspm_packages/**",
      
      // Optional npm cache directory
      ".npm",
      
      // Optional eslint cache
      ".eslintcache",
      
      // Microbundle cache
      ".rpt2_cache/**",
      ".rts2_cache_cjs/**",
      ".rts2_cache_es/**",
      ".rts2_cache_umd/**",
      
      // Optional REPL history
      ".node_repl_history",
      
      // Output of 'npm pack'
      "*.tgz",
      
      // Yarn Integrity file
      ".yarn-integrity",
      
      // dotenv environment variables file
      ".env",
      
      // parcel-bundler cache
      ".parcel-cache/**",
      
      // next.js build output
      ".next/**",
      
      // nuxt.js build output
      ".nuxt/**",
      
      // vuepress build output
      ".vuepress/dist/**",
      
      // Serverless directories
      ".serverless/**",
      
      // FuseBox cache
      ".fusebox/**",
      
      // DynamoDB Local files
      ".dynamodb/**",
      
      // TernJS port file
      ".tern-port",
      
      // Test files (they have their own linting rules)
      "**/*.spec.ts",
      "**/*.test.ts",
      
      // Configuration files
      "*.config.js",
      "*.config.ts",
      
      // Documentation
      "*.md",
      
      // Temporary files
      "*.tmp",
      "*.temp",
      
      // Large files that might cause memory issues
      "src/assets/vendors/**",
      "src/assets/scripts/**",
      "src/assets/images/**",
    ],
  },
  // Minimal configuration for TypeScript files
  {
    files: ["src/app/**/*.ts"],
    languageOptions: {
      parser: tsEslintParser,
      parserOptions: {
        ecmaVersion: 2022,
        sourceType: "module",
      },
    },
    plugins: {
      "@typescript-eslint": tsEslintPlugin,
      "unused-imports": unusedImports,
    },
    rules: {
      // Only the most essential rules
      "unused-imports/no-unused-imports": "error",
      "@typescript-eslint/no-unused-vars": "off",
      "no-console": "warn",
      "prefer-const": "error", // Enforce const when possible
      "no-undef": "off", // Turn off for TypeScript files
      "no-unused-vars": "off", // Turn off for TypeScript files
      "no-useless-escape": "warn",
      "semi": ["error", "always"], // Require semicolons
      "@typescript-eslint/no-explicit-any": "warn", // Warn about any usage
      
      // Additional useful rules
      "eqeqeq": ["error", "always"], // Require === and !==
      "no-var": "error", // Require let/const instead of var
      "prefer-template": "warn", // Prefer template literals over string concatenation
      "no-duplicate-imports": "error", // Prevent duplicate imports
      "no-self-assign": "error", // Prevent self-assignment
      "@typescript-eslint/no-inferrable-types": "error", // Remove redundant type annotations
      "@typescript-eslint/explicit-function-return-type": "warn", // Require explicit return types
    },
  },
];