import React, { useState } from "react";
import DisplayInfo from "./DisplayInfo";
import AddUser from "./AddUser";
// class MyComponent extends React.Component {
//     state = {
//         listUsers: [
//             { id: 1, name: 'pham van huan', age: '30' },
//             { id: 2, name: 'Nguyen Tien An', age: '24' },
//             { id: 3, name: 'Le Thuan Dieu', age: '14' }
//         ]
//     }
//     handleDataFromInput = (user) => {
//         this.setState({
//             listUsers: [user, ...this.state.listUsers]
//         })
//         console.log('>>>check listuser', this.state.listUsers)
//     }
//     handleDeleteUser = (userId) => {
//         console.log('>>>check user delete', userId)
//         let listUserClone = this.state.listUsers;
//         listUserClone = listUserClone.filter(item => item.id !== userId)
//         this.setState({
//             listUsers: listUserClone
//         })
//     }
//     render() {
//         const test = 45
//         return (
//             <div>
//                 {JSON.stringify(test)}
//                 {test}
//                 <AddUser handleDataFromInput={this.handleDataFromInput}
//                     listUsers={this.state.listUsers} />
//                 <DisplayInfo listUsers={this.state.listUsers}
//                     handleDeleteUser={this.handleDeleteUser}
//                 />
//             </div>
//         );
//     }
// }

const MyComponent = (props) => {
    const [listUsers, handleUsers] = useState([
        { id: 1, name: 'pham van huan', age: '30' },
        { id: 2, name: 'Nguyen Tien An', age: '24' },
        { id: 3, name: 'Le Thuan Dieu', age: '14' }
    ])
    const handleDataFromInput = (user) => {
        handleUsers([user, ...listUsers])
        console.log('>>>check listuser', listUsers)
    }
    const handleDeleteUser = (userId) => {
        console.log('>>>check user delete', userId)
        let listUserClone = listUsers;
        listUserClone = listUserClone.filter(item => item.id !== userId)
        handleUsers(listUserClone)
    }
    return (
        <div>
            <AddUser handleDataFromInput={handleDataFromInput}
                listUsers={listUsers} />
            <DisplayInfo listUsers={listUsers}
                handleDeleteUser={handleDeleteUser}
            />
        </div>
    );

}
export default MyComponent