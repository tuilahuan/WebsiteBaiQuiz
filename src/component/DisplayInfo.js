import React, { useEffect, useState } from "react";
import './DisplayInfor.scss';

const DisplayInfo = (props) => {
    const { listUsers, handleDeleteUser } = props;

    const [isShowHideListUser, setShowHideListUser] = useState(true);

    const handleShowHideListUser = () => {
        setShowHideListUser(!isShowHideListUser)
    }

    console.log('>>> call me render')
    useEffect(
        () => {
            if (listUsers.length === 0) {
                alert('You deleted all the users')
            }
            console.log('>>> call me useeffect')
        }, [listUsers]);

    return (
        <div className="dislpay-info-container">
            <div>
                <div>
                    <span onClick={() => handleShowHideListUser()}> {
                        isShowHideListUser === true ? 'Hide list user' : 'Show list user'}</span>
                </div>
                {isShowHideListUser && listUsers.length > 0 && listUsers.map((item, index) => {
                    return (
                        <div className={+item.age > 18 ? "red" : "green"} key={item.id}>
                            My name is {item.name}, {item.age}
                            <button onClick={() => handleDeleteUser(item.id)}>Delete</button>
                            <hr />
                        </div>
                    )
                })
                }
            </div>

        </div>

    )

}

export default DisplayInfo