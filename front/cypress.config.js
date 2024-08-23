import { defineConfig } from "cypress";
import installLogsPrinter from "cypress-terminal-report/src/installLogsPrinter";

const isDocker = process.env.DOCKER_MODE === 'true'

export default defineConfig({
    e2e: {
        baseUrl: `http://${isDocker ? 'frontend' : 'localhost'}:9898`,
        setupNodeEvents(on, config) {
            installLogsPrinter(on, {
                printLogsToConsole: "always",
            })
        },
    },
});
