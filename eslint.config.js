import js from "@eslint/js";
import tsEslintPlugin from "@typescript-eslint/eslint-plugin";
import tsEslintParser from "@typescript-eslint/parser";
import angularEslint from "@angular-eslint/eslint-plugin";
import angularEslintTemplate from "@angular-eslint/eslint-plugin-template";
import angularEslintTemplateParser from "@angular-eslint/template-parser";
import stylistic from "@stylistic/eslint-plugin";
import importPlugin from "eslint-plugin-import";
import noNull from "eslint-plugin-no-null";
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
    ],
  },
  // {
  //   files: ["src/app/**/*.ts"],
  //   languageOptions: {
  //     parser: tsEslintParser,
  //     parserOptions: {
  //       project: ["./tsconfig.json"],
  //       createDefaultProgram: true,
  //     },
  //   },
  //   plugins: {
  //     "@typescript-eslint": tsEslintPlugin,
  //     "@angular-eslint": angularEslint,
  //     "@angular-eslint/template": angularEslintTemplate,
  //     "@stylistic": stylistic,
  //     import: importPlugin,
  //     "no-null": noNull,
  //     "unused-imports": unusedImports,
  //   },
  //   rules: {
  //     "import/order": [
  //       "warn",
  //       {
  //         groups: [["builtin", "external"], "internal", ["parent", "sibling", "index"]],
  //         "newlines-between": "always",
  //       },
  //     ],
  //     "import/no-duplicates": "error",
  //     "no-null/no-null": "warn",
  //     indent: [
  //       "warn",
  //       2,
  //       {
  //         SwitchCase: 1,
  //         flatTernaryExpressions: true,
  //         ignoredNodes: [
  //           "PropertyDefinition[decorators]",
  //           "TSUnionType",
  //           "TSTypeParameterInstantiation",
  //           "TSIntersectionType",
  //           "ObjectExpression > SpreadElement > ConditionalExpression > ObjectExpression",
  //         ],
  //       },
  //     ],
  //     "no-extra-semi": "error",
  //     "object-curly-spacing": ["warn", "always"],
  //     semi: ["error", "always"],
  //     quotes: ["warn", "single", { avoidEscape: true, allowTemplateLiterals: true }],
  //     "@stylistic/member-delimiter-style": [
  //       "error",
  //       {
  //         multiline: { delimiter: "semi", requireLast: true },
  //         singleline: { delimiter: "semi", requireLast: false },
  //         multilineDetection: "brackets",
  //       },
  //     ],
  //     "@typescript-eslint/no-deprecated": "error",
  //     "@angular-eslint/component-class-suffix": ["error", { suffixes: ["Component", "Directive", "View", "Page"] }],
  //     "@angular-eslint/component-selector": ["error", { type: "element", prefix: "app", style: "kebab-case" }],
  //     "@angular-eslint/directive-selector": ["error", { type: "attribute", prefix: "app", style: "camelCase" }],
  //     "@angular-eslint/no-empty-lifecycle-method": "off",
  //     "@angular-eslint/prefer-inject": "off",
  //     "@angular-eslint/prefer-on-push-component-change-detection": "warn",
  //     "@angular-eslint/prefer-standalone": "off",
  //     "@typescript-eslint/await-thenable": "error",
  //     "@typescript-eslint/explicit-function-return-type": ["warn", { allowExpressions: true }],
  //     "@typescript-eslint/no-explicit-any": ["warn", { ignoreRestArgs: true }],
  //     "@typescript-eslint/no-inferrable-types": ["error", { ignoreParameters: true }],
  //     "@typescript-eslint/no-floating-promises": ["error", { ignoreVoid: true, ignoreIIFE: true }],
  //     "@typescript-eslint/no-misused-promises": ["error", { checksVoidReturn: { properties: false, arguments: false, inheritedMethods: false } }],
  //     "@typescript-eslint/no-unused-vars": "off",
  //     "unused-imports/no-unused-imports": "error",
  //     "unused-imports/no-unused-vars": ["error", { vars: "all", args: "none" }],
  //     "@typescript-eslint/prefer-optional-chain": "warn",
  //     "@typescript-eslint/typedef": ["error", { parameter: true, propertyDeclaration: true }],
  //     "consistent-return": "error",
  //     "no-mixed-spaces-and-tabs": "warn",
  //     "no-unused-vars": "off",
  //     eqeqeq: ["warn", "smart"],
  //     "no-console": "warn",
  //     "no-constant-condition": ["error", { checkLoops: false }],
  //     "prefer-const": "warn",
  //     "prefer-template": "warn",
  //   },
  // },
  {
    files: ["src/app/**/*.html"],
    languageOptions: {
      parser: angularEslintTemplateParser,
      parserOptions: {
        project: ["./tsconfig.json"],
        createDefaultProgram: true,
      },
    },
    plugins: {
      "@angular-eslint/template": angularEslintTemplate,
    },
    rules: {
      "@angular-eslint/template/alt-text": ["warn"],
      "@angular-eslint/template/elements-content": ["warn"],
      "@angular-eslint/template/valid-aria": ["warn"],
      "@angular-eslint/template/attributes-order": ["warn"],
      "@angular-eslint/template/banana-in-box": ["error"],
      "@angular-eslint/template/button-has-type": ["error"],
      "@angular-eslint/template/conditional-complexity": ["error", { maxComplexity: 5 }],
      "@angular-eslint/template/eqeqeq": ["warn"],
      "@angular-eslint/template/no-any": ["error"],
      "@angular-eslint/template/no-call-expression": ["warn", { allowList: [] }],
      "@angular-eslint/template/no-distracting-elements": ["warn"],
      "@angular-eslint/template/no-duplicate-attributes": ["error"],
      "@angular-eslint/template/no-inline-styles": ["warn", { allowNgStyle: true, allowBindToStyle: true }],
      "@angular-eslint/template/no-negated-async": ["error"],
    },
  },
];
