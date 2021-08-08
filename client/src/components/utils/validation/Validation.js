export const isEmpty = value => {
    if(!value) return true
    return false
}

export const isEmail = email => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

export const isLength = password => {
    const rep = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
    return rep.test(String(password));
}

export const isMatch = (password, cf_password) => {
    if(password === cf_password) return true
    return false
}

export const isQuestion = questionTitle => {
    const wc = /\b\w+\b(?:.*?\b\w+\b){7}/;
    return wc.test(String(questionTitle).toLowerCase());
}