# Fixing auth.js -> authUser
Currently simply decoding JWT instead of verifying
Fixed logic to verify instead

# Attempting to fix Jest logic error due to lack of encoder
Referencing: https://stackoverflow.com/questions/57712235/referenceerror-textencoder-is-not-defined-when-running-react-scripts-test
Created jest.config.js with config `testEnvironment: node`
Then:
Referencing: https://github.com/inrupt/solid-client-authn-js/issues/1676
import { TextEncoder, TextDecoder } from 'util';
global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;

Referencing: https://stackoverflow.com/questions/19697858/referenceerror-textencoder-is-not-defined


No fixes worked, can't further do assessment