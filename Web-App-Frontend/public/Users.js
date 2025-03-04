const UserAndPass = JSON.parse(localStorage.getItem('UserAndPass')) || [{ username: 'admin', password: 'password1' }];

export const saveUser = (newUser) => {
    UserAndPass.push(newUser);
    // localStorage.setItem('UserAndPass', JSON.stringify(UserAndPass));
    
};

export default UserAndPass;