var path = require("path");

// Export the configuration
module.exports = (env, argv) => {
    var isDev = argv.mode === "development";

    // Return the configuration
    return {
        // Main project file
        entry: [
            "./node_modules/ace-builds/src-min-noconflict/ace.js",
            "./node_modules/ace-builds/src-min-noconflict/ext-language_tools.js",
            "./node_modules/ace-builds/src-min-noconflict/mode-javascript.js",
            "./node_modules/ace-builds/src-min-noconflict/theme-monokai.js",
            "./node_modules/gd-sprest-bs/dist/gd-sprest-bs-icons.min.js",
            "./src/index.ts"
        ],

        externals: {
            "gd-sprest-bs": "$REST",
            "ace-builds": "ace"
        },

        // Output information
        output: {
            path: path.resolve(__dirname, "dist"),
            filename: "code-editor" + (isDev ? "" : ".min") + ".js"
        },

        // Resolve the file names
        resolve: {
            extensions: [".js", ".ts"]
        },

        // Compiler Information
        module: {
            rules: [
                // Handle HTML Files
                {
                    test: /\.html$/,
                    exclude: "/node_modules/",
                    use: [{ loader: "html-loader" }]
                },
                // Handle TypeScript Files
                {
                    test: /\.tsx?$/,
                    exclude: /node_modules/,
                    use: [
                        // Step 2 - Compile JavaScript ES6 to JavaScript Current Standards
                        {
                            loader: "babel-loader",
                            options: {
                                presets: ["@babel/preset-env"]
                            }
                        },
                        // Step 1 - Compile TypeScript to JavaScript ES6
                        {
                            loader: "ts-loader"
                        }
                    ]
                }
            ]
        }
    };
}