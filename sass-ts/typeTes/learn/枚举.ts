(() => {
    enum Role {
        CLIENT = "用户",
        ADMIN = "管理员",
        DOCTOR = "医生"
    }

    const getName = (role: Role) => role
    console.log(getName(Role.ADMIN))
})()