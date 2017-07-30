/**
 * Created by i01007600615 on 2017/5/14.
 */
import React, {Component}  from 'react';
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
import {accProdNo, accBizNo, accBizType, transferProdNo, transferBizType, transferBizNo} from './accConst.js';
import Currency from "cathay-currency";
import fetch from "cathay-fetch";
const dateFormat = 'YYYY-MM-DD';
const Option = Select.Option;
const FormItem = Form.Item;
const {MonthPicker, RangePicker} = DatePicker;

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
//table中业务过滤器
let bizNoFilter = [];
const updateBizNoFilter = function (bizSet) {
    bizNoFilter.length = 0;
    for (let item of bizSet.values()) {
        bizNoFilter.push({
            text: item.bizName,
            value: item.bizName,
        });
    }
}

const columns = [{
    title: '险种',
    dataIndex: 'prodNo',
    width: 100,
    filters: prodNoFilter,
    onFilter: (value, record) => transferProdNo(record.prodNo).prodName.indexOf(value) === 0,
    render: (text, record, index) => transferProdNo(text).prodName,
}, {
    title: '业务',
    dataIndex: 'bizNo',
    width: 60,
    filters: bizNoFilter,
    onFilter: (value, record) => transferBizNo(record.bizNo).bizName.indexOf(value) === 0,
    render: (text, record, index) => transferBizNo(text).bizName,
}, {
    title: '金额',
    dataIndex: 'amount',
    width: 90,
    render: (text, record, index) => <Currency>{text / 100 + ''}</Currency>
}, {
    title: '会计日期',
    dataIndex: 'accDate',
    width: 100,
    sorter: (a, b) => {
        let aMm = new Date(a.accDate).getTime();
        let bMm = new Date(b.accDate).getTime();
        return aMm - bMm;
    },
}, {
    title: '会计科目',
    dataIndex: 'accEntry',
    width: 100,
}, {
    title: '会计子目',
    dataIndex: 'accSubEntry',
    width: 80,
}, {
    title: '会计细目',
    dataIndex: 'accItem',
    width: 80,
}, {
    title: '传票码',
    dataIndex: 'voucherNum',
    width: 80,
}, {
    title: '借贷方向',
    dataIndex: 'direction',
    width: 70,
    filters: [{text: '借', value: 'D'}, {text: '贷', value: 'C'}],
    onFilter: (value, record) => record.direction == value,
    render: (text, record, index) => text == 'D' ? '借' : '贷',
}];

class AccSum extends Component {
    constructor(props) {
        super(props);
        this.state = {
            accBillSumDTOList: [],
            showModan: false,
            modanContent: '',
            tableLoading: false,
        }
        //搜索的险种
        this.prodNo = null;
        //搜索的业务
        this.bizNo = null;
        //搜索的日期起始时间
        this.dateStart = null;
        //搜索的日期结束时间
        this.dateEnd = null;
    }

    handleProdChange(value) {
        this.prodNo = value;
    }

    handleBizNoChange(bizNo) {
        this.bizNo = bizNo;
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
        let bizNo = this.bizNo;
        let dateStart = this.dateStart;
        let dateEnd = this.dateEnd;
        if (dateStart == null || dateEnd == null) {
            this.showMessageBox(true, '请选择日期范围');
            return;
        }
        this.setState({tableLoading: true});
        fetch(`/api/v1/acc/billsum/result?prodNo=${this.prodNo == null ? '' : this.prodNo}&bizNo=${this.bizNo == null ? '' : this.bizNo}&beginDate=${this.dateStart}&endDate=${this.dateEnd}`, {
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
            let bizNoSet = new Set();
            if (res.data.accBillSumDTOList.length >= 500) {
                alert('返回数量超过500条，只显示前500条。请缩小查询范围');
            }
            for (let result of res.data.accBillSumDTOList) {
                prodNoSet.add(transferProdNo(result.prodNo));
                bizNoSet.add(transferBizNo(result.bizNo));
            }
            updateProdFilter(prodNoSet);
            updateBizNoFilter(bizNoSet);
            this.setState({
                tableLoading: false,
                accBillSumDTOList: res.data.accBillSumDTOList,
            });
        })
    }

    render() {
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
                                    mode="multiple" onChange={this.handleBizNoChange.bind(this)}>
                                    {accBizNo.map((item, index) => {
                                        return <Option key={item.bizNo}>{item.bizName}</Option >
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
                            <Table columns={columns} dataSource={this.state.accBillSumDTOList}
                                   pagination={{pageSize: 50}} scroll={{y: 350}}/>
                        </Spin>
                    </Row>
                </Form>
            </div>
        );
    }
}

export default Form.create()(AccSum)