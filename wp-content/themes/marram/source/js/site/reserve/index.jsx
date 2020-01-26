/**
 * External dependencies
 */
import React from 'react'
import { render } from 'react-dom'
import $ from 'jQuery'
/**
 * Internal dependencies
 */
import App from './components/Reserve'

const id = 'marram-reserve'
$('.mtk-header').append(`<div id="${id}" />`)
render(<App />, document.getElementById(id))
