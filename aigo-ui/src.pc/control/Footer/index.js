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
          Copyright @ Cathay Insurance Co.,Ltd.
        </p>
      </div>
    )
  }
}
