import React from 'react'

import './index.less'

export default class Footer extends React.Component {
  constructor () {
    super()
  }

  render () {

    return (
      <div className="ant-layout-footer">
        <p>
          Copyright @ Yunna Co.,Ltd.
        </p>
      </div>
    )
  }
}
