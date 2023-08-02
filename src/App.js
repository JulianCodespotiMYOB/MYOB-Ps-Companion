import React from 'react';
import {BaseTemplate, MYOBLogo, Navigation, SignOutIcon, ThemeProvider, ToastProvider} from '@myob/myob-widgets';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Employees from "./Employees/employees";
import Registrations from "./Registrations/registrations";

const brand = (
    <Navigation.Brand url="#Dashboard" width="73px">
        <MYOBLogo/>
    </Navigation.Brand>
);
const primary = [
    <Navigation.Link
        key="registrations"
        label="Registrations"
        url="registrations"
    />,
    <Navigation.Link
        key="employers"
        label="Employers"
        url="employers"
    />,
    <Navigation.Link
        key="employees"
        label="Employees"
        url="employees"
    />,
    <Navigation.Link
        key="batchPayments"
        label="Batch Payments"
        url="batchPayments"
    />,
    <Navigation.Link
        key="superProducts"
        label="Super Products"
        url="superProducts"
    />,
    <Navigation.Link
        key="smsf"
        label="SMSF"
        url="smsf"
    />,
    <Navigation.Link
        key="superPortalRegistrations"
        label="Super Portal Registrations"
        url="superPortalRegistrations"
    />,
    <Navigation.Link
        key="auditHistory"
        label="Audit History"
        url="auditHistory"
    />,
    <Navigation.Link
        key="supportTools"
        label="Support Tools"
        url="supportTools"
    />,
];

const SettingsMenuItems = [
    <Navigation.MenuLink
        key="Logout"
        label="Logout"
        url="logout"
        onClick={() => ('clicked')}
        icon={<SignOutIcon/>}
        iconRight
    />,
];

const App = () => (
    <ThemeProvider theme="modern">
        <Router>
            <BaseTemplate fluid>
                <Navigation fluid brand={brand} primary={primary}/>
                <ToastProvider>
                <Routes>
                    <Route path="/employees" element={<Employees/>} />
                    <Route path="/registrations" element={<Registrations/>} />

                </Routes>
                </ToastProvider>
            </BaseTemplate>
        </Router>
    </ThemeProvider>
);

export default App;
