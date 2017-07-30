import React from 'react'
import {Button} from 'antd'
import "./index.css"


class Buttons extends React.Component{
    render() {
        return(
            <div className="ct-detail-actions">
                <div className="btns">
                    {
                        this.props.operations.map((item, index) => {

                            let operation = this.props.operationMap[item];

                            return(
                                operation?
                                    <Button
                                        key={index}
                                        size="large"
                                        type={index==0?'primary':'default'}
                                        onClick={()=>{this.props.actionController(operation)}}
                                    >{operation.label}</Button>
                                :
                                    undefined
                            )
                        })
                    }
                </div>
                {this.props.disabled?<div className="mask">请先完成当前操作</div>:undefined}
            </div>
        )
    }
}


export default Buttons