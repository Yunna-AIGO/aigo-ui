/**
 * Created by i01007600615 on 2017/5/7.
 */
const accProdNo = [
    {
        prodNo: 'EBT',
        prodName: '防骗险',
    }, {
        prodNo: 'EBV',
        prodName: '河狸家',
    }, {
        prodNo: 'BAE',
        prodName: '账户安全险(商业)',
    }, {
        prodNo: 'BAE_LIEBIAN',
        prodName: '账户安全险(裂变)',
    }, {
        prodNo: 'FAG',
        prodName: '骑手意外险',
    }, {
        prodNo: 'BAI',
        prodName: '盗抢险',
    }, {
        prodNo: 'FAL',
        prodName: '个人意外非车',
    }, {
        prodNo: 'FAM',
        prodName: '交通意外非车',
    }, {
        prodNo: 'EBW',
        prodName: '银行卡安全险',
    }, {
        prodNo: 'EBX',
        prodName: '食品安全险',
    }, {
        prodNo: 'EBU',
        prodName: '饿了么责任险',
    }, {
        prodNo: 'EBM',
        prodName: '参聚险保卖家',
    }, {
        prodNo: 'EBN',
        prodName: '参聚险保平台',
    }, {
        prodNo: 'EBQ',
        prodName: '参聚险保价险',
    },
    {
     prodNo: 'HAE',
     prodName: '退货险(卖家)',
     }, {
     prodNo: 'HAF',
     prodName: '退货险(买家)',
     }, {
     prodNo: 'EBH',
     prodName: '保证金保险',
     }, {
     prodNo: 'EBL',
     prodName: '账户安全险(基础)',
     }, {
     prodNo: 'EBP',
     prodName: '放心淘',
     }, {
     prodNo: 'EBO',
     prodName: '极保障',
     }, {
     prodNo: 'EBR',
     prodName: '保快险',
     }, {
     prodNo: 'FAN',
     prodName: '单车',
     }, {
     prodNo: 'EBY',
     prodName: '网贷',
     }
]
/** 业务类型 */
const accBizType = [
    {
        bizType: 'policy_active',
        bizDesc: '承保生效',
        bizNo: '1',
    },
    {
        bizType: 'policy_pay',
        bizDesc: '承保缴费',
        bizNo: '1',
    },
    {
        bizType: 'claim_assess',
        bizDesc: '理赔核赔',
        bizNo: '2',
    },
    {
        bizType: 'claim_end',
        bizDesc: '理赔结案',
        bizNo: '2',
    },
    {
        bizType: 'policy_cancel',
        bizDesc: '保单退保',
        bizNo: '3',
    },
];

const accBizNo = [
    {
        bizNo: '1',
        bizName: '承保'
    },
    {
        bizNo: '2',
        bizName: '理赔'
    }, {
        bizNo: '3',
        bizName: '退保'
    }, {
        bizNo: '4',
        bizName: '追偿'
    },
];

/** 从产品编码返回产品对象 */
const transferProdNo = function (prodNo) {
    for (let p of accProdNo) {
        if (prodNo == p.prodNo) {
            return p;
        }
    }
    return {
        prodNo: prodNo,
        prodName: prodNo,
    };
}

const transferBizType = function (bizType) {
    for (let p of accBizType) {
        if (bizType == p.bizType) {
            return p;
        }
    }
    return {
        bizType: bizType,
        bizDesc: bizType,
    };
}

const transferBizNo = function (bizNo) {
    for (let p of accBizNo) {
        if (bizNo == p.bizNo) {
            return p;
        }
    }
    return {
        bizNo,
        bizName: bizNo
    }
}

export {accProdNo,accBizNo, accBizType, transferProdNo, transferBizType, transferBizNo}
