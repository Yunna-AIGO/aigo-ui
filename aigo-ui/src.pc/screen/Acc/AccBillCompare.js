/**
 * Created by i01007600615 on 2017/5/6.
 */
import React, {Component}  from 'react';
import Currency from "cathay-currency";
import {accProdNo, accBizType, transferProdNo, transferBizType} from './accConst.js';
import {
    Form,
    Input,
    Spin,
    Button,
    Table,
    Modal,
    Popover,
    Menu,
    Select,
    Icon,
    Row, Col,
    DatePicker
} from 'antd';
import fetch from "cathay-fetch";
const {MonthPicker, RangePicker} = DatePicker;
const dateFormat = 'YYYY-MM-DD';
const Option = Select.Option;
const FormItem = Form.Item;

let searchCondition = {
    prodNo: null,
    biz: null,
    month: null,
};

const formItemLayout = {
    labelCol: {
        xs: {span: 24},
        sm: {span: 6},
    },
    wrapperCol: {
        xs: {span: 24},
        sm: {span: 14},
    },
};
const displayFrame = function (description) {
    return <div>
        <p>{description}</p>
        /* <p><a>重新计算此日数据</a></p> */
    </div>;
}

//table中险种列的过滤器
let prodNoFilter = [];
const updateProdFilter = function (prodNoSet) {
    prodNoFilter.length = 0;
    for (let item of prodNoSet.values()) {
        prodNoFilter.push({
            text: item.prodName,
            value: item.prodName,
        });
    }
}
//table中业务类型过滤器
let bizTypeFilter = []
const updateBizTypeFilter = function (bizSet) {
    bizTypeFilter.length = 0;
    for (let item of bizSet.values()) {
        bizTypeFilter.push({
            text: item.bizDesc,
            value: item.bizDesc,
        });
    }
}

/** table表头
 * 其中险种需要过滤
 * 日期需要排序
 * */

const columns = [{
    title: '险种',
    dataIndex: 'prodNo',
    width: 150,
    filters: prodNoFilter,
    onFilter: (value, record) => transferProdNo(record.prodNo).prodName.indexOf(value) === 0,
    render: (text, record, index) => transferProdNo(text).prodName,
}, {
    title: '业务类型',
    dataIndex: 'bizType',
    width: 150,
    filters: bizTypeFilter,
    onFilter: (value, record) => transferBizType(record.bizType).bizDesc.indexOf(value) === 0,
    render: (text, record, index) => transferBizType(text).bizDesc,
}, {
    title: '日期',
    dataIndex: 'bizDate',
    width: 150,
    sorter: (a, b) => {
        let aMm = new Date(a.bizDate).getTime();
        let bMm = new Date(b.bizDate).getTime();
        return aMm - bMm;
    },
}, {
    title: '业务数',
    dataIndex: 'insCount',
    width: 100,
}, {
    title: '账务数',
    dataIndex: 'accCount',
    width: 100,
}, {
    title: '业务金额',
    dataIndex: 'insAmount',
    width: 150,
    render: (text, record, index) => <Currency>{text / 100 + ''}</Currency>
}, {
    title: '账务金额',
    dataIndex: 'accAmount',
    width: 150,
    render: (text, record, index) => <Currency>{text / 100 + ''}</Currency>
}, {
    title: '',
    dataIndex: 'resultCode',
    render: (text, record) => {
        if (record.resultCode == 'N') {
            return <div>
                <Popover content={displayFrame(record.description)} title="注意" trigger="hover">
                    <Icon type="close-circle" style={{color: "red", fontSize: "15px"}}/>
                </Popover>
            </div>
        } else {
            return <div>
                <Icon type="check-circle" style={{color: "green", fontSize: "15px"}}/>
            </div>
        }
    }
}];

class AccBillCompare extends Component {
    constructor(props) {
        super(props);
        this.state = {
            billCompareResultList: [],
            showModan: false,
            modanContent: '',
            tableLoading: false,
        }
        //搜索的险种
        this.prodNo = null;
        //搜索的业务
        this.bizType = null;
        //搜索的日期起始时间
        this.dateStart = null;
        //搜索的日期结束时间
        this.dateEnd = null;
    }

    handleProdChange(value) {
        this.prodNo = value;
    }

    handleBizTypeChange(bizType) {
        this.bizType = bizType;
    }

    handleDateRangeChange(dateRange) {
        this.dateStart = dateRange[0].format(dateFormat);
        this.dateEnd = dateRange[1].format(dateFormat);
    }

    showMessageBox(show, content) {
        this.setState({showModan: show, modanContent: content});
    }

    fetchResult() {
        let prodNo = this.prodNo;
        let bizType = this.bizType;
        let dateStart = this.dateStart;
        let dateEnd = this.dateEnd;
        if (dateStart == null || dateEnd == null) {
            this.showMessageBox(true, '请选择日期范围');
            return;
        }
        this.setState({tableLoading: true});
        fetch(`/api/v1/acc/billcompare/result?prodNo=${this.prodNo == null ? '' : this.prodNo}&bizType=${this.bizType == null ? '' : this.bizType}&beginDate=${this.dateStart}&endDate=${this.dateEnd}`, {
            method: 'get'
        }).then(res => {
            if (res.code != '200') {
                alert('返回错误:' + res.message);
                this.setState({
                    tableLoading: false,
                });
                return;
            }
            let prodNoSet = new Set();
            let bizTypeSet = new Set();
            if (res.data.billCompareResultList.length >= 500) {
                alert('返回数量超过500条，只显示前500条。请缩小查询范围');
            }
            for (let result of res.data.billCompareResultList) {
                prodNoSet.add(transferProdNo(result.prodNo));
                bizTypeSet.add(transferBizType(result.bizType));
            }
            updateProdFilter(prodNoSet);
            updateBizTypeFilter(bizTypeSet);
            this.setState({
                tableLoading: false,
                billCompareResultList: res.data.billCompareResultList,
            })
        })
    }

    componentWillMount() {
        this.menuList = (<Menu >
            {accProdNo.map((item, index) => {
                return <Menu.Item key={item.prodNo}>{item.prodName}</Menu.Item>
            })}
        </Menu>);
    }

    render() {
        return (
            <div>
                <Modal
                    title="提示"
                    wrapClassName="vertical-center-modal"
                    visible={this.state.showModan}
                    onOk={() => this.showMessageBox(false)}
                    onCancel={() => this.showMessageBox(false)}
                >
                    <p>{this.state.modanContent}</p>
                </Modal>
                <Form>
                    <Row>
                        <Col span={8}>
                            <FormItem label="险种" {...formItemLayout}>
                                <Select
                                    mode="multiple" onChange={this.handleProdChange.bind(this)}>
                                    {accProdNo.map((item, index) => {
                                        return <Option key={item.prodNo}>{item.prodName}</Option >
                                    })
                                    }
                                </Select>
                            </FormItem>
                        </Col>
                        <Col span={8}>
                            <FormItem label="业务" {...formItemLayout}>
                                <Select
                                    mode="multiple" onChange={this.handleBizTypeChange.bind(this)}>
                                    {accBizType.map((item, index) => {
                                        return <Option key={item.bizType}>{item.bizDesc}</Option >
                                    })
                                    }
                                </Select>
                            </FormItem>
                        </Col>
                        <Col span={8}>
                            <FormItem label="时间范围" {...formItemLayout}>
                                <RangePicker
                                    format={dateFormat} onChange={this.handleDateRangeChange.bind(this)}
                                />
                            </FormItem>
                        </Col>
                    </Row>
                    <Row type="flex" justify="space-around" align="right">
                        <div>
                            <Button type="primary" style={{marginBottom: '5px'}} onClick={this.fetchResult.bind(this)}>查询</Button>
                        </div>
                    </Row>
                    <Row>
                        <Spin spinning={this.state.tableLoading} tip="获取数据中...">
                            <Table
                                columns={columns} dataSource={this.state.billCompareResultList}
                                pagination={{pageSize: 50}}
                                scroll={{y: 350}}/>
                        </Spin>
                    </Row>
                </Form>
            </div>
        )
    }
}

export default Form.create()(AccBillCompare)