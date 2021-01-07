export function splitName(fullName) {
    var names = { firstname: "", lastname: "" }
    let splittedName = fullName.split(' ');
    if (splittedName.length === 1) {
        names.firstname = splittedName[0];
    }
    else if (splittedName.length === 2) {
        names.firstname = splittedName[0];
        names.lastname = splittedName[1];
    }
    else {
        names.firstname = splittedName[0] + " " + splittedName[1];
        for (var i = 2; i < splittedName.length; i++) {
            names.lastname = names.lastname + " " + splittedName[i];
        }
        names.lastname = names.lastname.trim();
    }

    return names;
}

export function matchPasswords(password, confirmPassword) {
    return password === confirmPassword;
}

export function passwordIsCorrect(password) {
    var re = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,25}$/;
    return re.test(password);
}