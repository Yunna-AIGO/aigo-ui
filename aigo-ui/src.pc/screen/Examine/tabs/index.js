import SurveyInfo from './SurveyInfo';
import ClientInfo from './ClientInfo';
import CalculationInformation from './CalculationInformation';
import DocumentInformation from './DocumentInformation';
import OperationLog from './OperationLog';

const tabs = [
    {
        code: "SurveyInfo",
        label: "查勘信息",
        Component: SurveyInfo
    },
    {
        code: "ClientInfo",
        label: "立案信息",
        Component: ClientInfo
    },
    {
        code: "CalculationInformation",
        label: "理算信息",
        Component: CalculationInformation
    },
    {
        code: "DocumentInformation",
        label: "单证信息",
        Component: DocumentInformation
    },
    {
        code: "OperationLog",
        label: "操作日志",
        Component: OperationLog
    }
]

module.exports = tabs;