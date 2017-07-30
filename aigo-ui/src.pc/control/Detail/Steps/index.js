import React from 'react'
import { Steps } from 'antd';
import './index.css'
const Step = Steps.Step;


class MySteps extends React.Component {
    render () {
            const currentStep = this.props.currentStep;
            const items = this.props.items;

            let current = 0;

            items.forEach((item, index)=>{
                if(!currentStep){
                    current = -1;
                }
                if(currentStep == item.code){
                    current = index;
                }
            })

            return (
                <div className="steps">
                    <Steps current={current}>
                        {
                            items.map(function(item,index){
                                return <Step title={item.title} description={item.des} key={index} />
                            })
                        }
                    </Steps>
                </div>
            )
    }

}

export default MySteps;
