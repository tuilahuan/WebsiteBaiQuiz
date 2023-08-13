import React, { useState } from "react";

// class AddUser extends React.Component {
//     state = {
//         name: '',
//         age: ''
//     }
//     handleOnChangeInputName = (event) => {
//         this.setState({
//             name: event.target.value
//         })
//     }
//     handleOnChangeInputAge = (event) => {
//         this.setState({
//             age: event.target.value
//         })
//     }
//     handelOnSubmit = (event) => {
//         event.preventDefault();
//     }
//     handlleOnClikButton = () => {
//         this.props.handleDataFromInput({
//             id: Math.floor((Math.random() * 100) + 1) + '_random',
//             name: this.state.name,
//             age: this.state.age
//         })
//         console.log('>>>check data props', this.props.listUsers)
//     }
//     render() {
//         return (
//             <div>
//                 <form onSubmit={(event) => this.handelOnSubmit(event)}>
//                     <p>Name</p>
//                     <input onChange={(event) => this.handleOnChangeInputName(event)} />
//                     <p>Age</p>
//                     <input onChange={(event) => this.handleOnChangeInputAge(event)} />
//                 </form>
//                 <button onClick={() => this.handlleOnClikButton()}> Submit</button>
//             </div>
//         )
//     }
// }

const AddUser = (props) => {
    const [name, setName] = useState('');
    const [age, setAge] = useState('');
    const handleOnChangeInputName = (event) => {
        setName(event.target.value)
    }
    const handleOnChangeInputAge = (event) => {
        setAge(event.target.value)

    }
    const handleOnSubmit = (event) => {
        event.preventDefault();
    }
    const handleOnClickButton = () => {
        props.handleDataFromInput({
            id: Math.floor((Math.random() * 100) + 1) + '_random',
            name: name,
            age: age
        })
        console.log('>>>check data props', props.listUsers)
    }
    return (
        <div>
            <form onSubmit={(event) => handleOnSubmit(event)}>
                <p>Name</p>
                <input onChange={(event) => handleOnChangeInputName(event)} />
                <p>Age</p>
                <input onChange={(event) => handleOnChangeInputAge(event)} />
            </form>
            <button onClick={() => handleOnClickButton()}> Submit</button>
        </div>
    )

}
export default AddUser