import * as Adapter from "enzyme-adapter-react-16";
import * as Enzyme from "enzyme";
import { shallow, render, mount } from "enzyme";
// Enzyme.configure({
//     adapter: Adapter(),
// });

jest.mock("react-native-appearance", () => {
    return {
        useColorScheme: jest.fn(),
        useTranslation:jest.fn(),
    };
});
// jest.mock("rn-modal-picker", () => ({
//         RNPicker: jest.fn(),
// }));



// jest.mock('react-native-snap-carousel', () => {
//     return {
//         render: jest.fn(),
//     };
// });

// jest.mock(
//     "./node_modules/react-native/Libraries/polyfills/error-guard.js"
// );
// jest.mock(
//     "./node_modules/jest-runtime/build/index.js"
// );
// jest.mock(
//     "./node_modules/react-native/jest/setup.js"
// );

//  jest.mock("@/Theme/themes");

// jest.mock("../App/Containers/ReportComponent/ReportComponent");

//  jest.mock('./Containers/Example/index.js');

// jest.mock('react-native-reanimated', () => {
//     const View = require('react-native').View;

//     return {
//         Value: jest.fn(),
//         event: jest.fn(),
//         add: jest.fn(),
//         eq: jest.fn(),
//         set: jest.fn(),
//         cond: jest.fn(),
//         interpolate: jest.fn(),
//         View: View,
//         Extrapolate: { CLAMP: jest.fn() },
//         Transition: {
//             Together: 'Together',
//             Out: 'Out',
//             In: 'In',
//         },
//         Easing: {
//             in: jest.fn(),
//             out: jest.fn(),
//             inOut: jest.fn(),
//         }
//     };
// });

// jest.mock("react-native-keychain", () => ({
//     setGenericPassword: jest.fn(),
//     getGenericPassword: jest.fn(),
//     resetGenericPassword: jest.fn(),
// }));
// jest.mock("react-native-push-notification", () => ({
//     configure: jest.fn(),
//     onRegister: jest.fn(),
//     onNotification: jest.fn(),
//     addEventListener: jest.fn(),
//     requestPermissions: jest.fn(),
// }));

export { shallow, mount, render };
export default Enzyme;
