import React, {PropTypes} from 'react'
import { bindActionCreators } from 'redux'
import { Breadcrumb , Icon} from 'antd'
import { connect } from 'react-redux'
import { Link } from 'react-router'

import './index.less'

const defaultProps = {
    keyPath: []
}

const propTypes = {
    keyPath: PropTypes.array
}

class NavPath extends React.Component {
    constructor(props) {
        super(props)


    }

    componentWillMount() {
        var router = this.context.router;
    }

    render() {
        const { keyPath } = this.props

        const items = keyPath.slice(0)
        const leafItem = items.pop();

        if (!leafItem) {
            return null;
        }


        const bread = items.map((item)=> {

            return (
                <Breadcrumb.Item key={item.key}>
                    <Link to={item.url}> <Icon type={item.icon}/> {item.name}</Link>
                </Breadcrumb.Item>
            )
        })
        return (
            <div className="ant-layout-breadcrumb">
                <Breadcrumb>
                    {bread}
                    <Breadcrumb.Item>{leafItem.name}</Breadcrumb.Item>
                </Breadcrumb>
            </div>
        )
    }
}

NavPath.propTypes = propTypes;
NavPath.defaultProps = defaultProps;
NavPath.contextTypes = {
    router: React.PropTypes.object
}

function mapStateToProps(state) {

    return {
        keyPath: state.menu.keyPath
    }
}

export default connect(mapStateToProps)(NavPath)
