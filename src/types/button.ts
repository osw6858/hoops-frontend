import React from 'react'

export interface BasicButtonProps {
  children: React.ReactNode
  type: 'button' | 'submit' | 'reset'
  onClick?: () => void
  disabled?: boolean
  $bgColor: string
  $hoverBgColor?: string
  $fontcolor?: string
  $borderColor?: string
  $width?: string
  $height?: string
}

export interface SelectButtonProps extends BasicButtonProps {
  $isSelected?: boolean
  onSelect?: (event: React.MouseEvent<HTMLButtonElement>) => void
}
