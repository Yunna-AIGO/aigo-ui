import React, { Component } from 'react';
import { Table, Icon, Input, Row, Col, Pagination } from 'antd';
import Approved  from './Approved';
import ApprovalRejected from './ApprovalRejected';

const operations = [
    {
        priority: 1,
        code: "Approved",
        label: "审批通过",
        Component: Approved
    },
    {
        priority: 2,
        code: "ApprovalRejected",
        label: "审批驳回",
        Component: ApprovalRejected
    }
];
module.exports = operations;

