    import React, { PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Menu, Icon } from 'antd'
import { Link } from 'react-router'
import { getAllMenu, updateNavPath } from '../../actions/menu'


import './index.less'

const defaultProps = {
    items: []
}

const propTypes = {
    items: PropTypes.array
}

class Sidebar extends React.Component {
    constructor(props) {
        super(props)
    }

    componentDidMount() {
        this.props.getAllMenu()
    }

    renderMenu() {

        const { items , activeKey} = this.props;
        const {router} = this.context;
        let openKeys = [];

        function renderLevelItems(items) {

            return items.map((item)=> {

                if(!item.key){
                    item.key = Math.random();
                }

                if (activeKey == item.key) {
                    let tmp = item;
                    while (tmp.parentKey) {
                        openKeys.push(tmp.parentKey);
                        tmp = tmp.parent;
                    }
                }

                if (item.children) {
                    return (
                        <Menu.SubMenu
                            key={String(item.key)} onTitleClick={()=>{
                                item.url && router.push(item.url);
                            }}
                            title={<span><Icon type={item.icon} />{item.name}</span>}>
                            {renderLevelItems(item.children)}
                        </Menu.SubMenu>
                    )

                } else {

                    return (
                        <Menu.Item key={String(item.key)}>
                            <Link to={item.url}> <Icon type={item.icon}/> {item.name}</Link>
                        </Menu.Item>
                    )
                }
            })
        }

        const renderMenus = renderLevelItems(items);

        return (
            <Menu
                mode="inline" theme="dark" defaultOpenKeys={openKeys}
                selectedKeys={[activeKey]}>
                {renderMenus}
            </Menu>
        );


    }

    render() {
        return (
            <aside className="ant-layout-sider">
                <div className="ant-layout-logo">
                    <i className="cathay-logo"/>
                    <h1><Link to='/home'>运营平台</Link></h1>
                </div>
                { this.renderMenu() }
            </aside>
        )
    }
}

Sidebar.propTypes = propTypes;
Sidebar.defaultProps = defaultProps;
Sidebar.contextTypes = {
    router: React.PropTypes.object
};

function mapStateToProps(state) {

    return {
        activeKey: state.menu.activeKey,
        items: state.menu.items
    }
}

function mapDispatchToProps(dispatch) {
    return {
        getAllMenu: bindActionCreators(getAllMenu, dispatch),
        updateNavPath: bindActionCreators(updateNavPath, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Sidebar)
