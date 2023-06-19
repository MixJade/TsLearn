"use strict";
(() => {
    let Role;
    (function (Role) {
        Role["CLIENT"] = "\u7528\u6237";
        Role["ADMIN"] = "\u7BA1\u7406\u5458";
        Role["DOCTOR"] = "\u533B\u751F";
    })(Role || (Role = {}));
    const getName = (role) => role;
    console.log(getName(Role.ADMIN));
})();
