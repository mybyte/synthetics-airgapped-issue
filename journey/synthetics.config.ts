import { SyntheticsConfig } from "@elastic/synthetics"

const config: SyntheticsConfig = {  
  playwrightOptions: {
    args: ["--ignore-certificate-errors", "--ignore-urlfetcher-cert-requests", "--ignore-certificate-errors-spki-list"],
    ignoreHTTPSErrors: true    
  }
}

export default config;