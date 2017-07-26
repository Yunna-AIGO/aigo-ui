
import RegisterInfo from './RegisterInfo'
import SurveyInfo from './SurveyInfo'
import DocUploadInfo from './DocUploadInfo';
import AdjustmentContent from './AdjustmentContent';

const tabs = [
    {
        code: "survey",
        label: "查勘信息",
        Component: SurveyInfo
    },
    {
        code: "registerTabInfo",
        label: "立案信息",
        Component: RegisterInfo
    },
    {
        code: "adjustmentTabInfo",
        label: "理算信息",
        Component: AdjustmentContent
    },
    {
        code: "docUploadInfo",
        label: "单证信息",
        Component: DocUploadInfo
    }
]

module.exports = tabs;