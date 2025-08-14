import React from 'react'


export const TableContainer = ({ children, className, ...props }) => (
  <div className={`table-container ${className || ''}`} {...props}>{children}</div>
)

export const TableRow = ({ children, className, ...props }) => (
  <div className={`table-row ${className || ''}`} {...props}>{children}</div>
)

export const TableCell = ({ children, className, flexBasis, ...props }) => (
  <div className={`table-cell ${className || ''}`} style={{ flexBasis: flexBasis || 'auto' }} {...props}>{children}</div>
)
