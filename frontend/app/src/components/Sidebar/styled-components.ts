/**
 * Copyright (c) Streamlit Inc. (2018-2022) Snowflake Inc. (2022-2024)
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import styled from "@emotion/styled"
import { keyframes } from "@emotion/react"
import { transparentize } from "color2k"
import { getWrappedHeadersStyle } from "@streamlit/lib/src/theme/utils"

export interface StyledSidebarProps {
  isCollapsed: boolean
  adjustTop: boolean
  sidebarWidth: string
}

export const StyledSidebar = styled.section<StyledSidebarProps>(
  ({ theme, isCollapsed, adjustTop, sidebarWidth }) => {
    const minWidth = isCollapsed ? 0 : Math.min(244, window.innerWidth)
    const maxWidth = isCollapsed ? 0 : Math.min(550, window.innerWidth * 0.9)

    return {
      // Nudge the sidebar by 2px so the header decoration doesn't go below it
      position: "relative",
      top: adjustTop ? "2px" : "0px",
      backgroundColor: theme.colors.bgColor,
      zIndex: theme.zIndices.header + 1,

      minWidth,
      maxWidth,
      transform: isCollapsed ? `translateX(-${sidebarWidth}px)` : "none",
      transition: "transform 300ms, min-width 300ms, max-width 300ms",

      "&:focus": {
        outline: "none",
      },

      [`@media (max-width: ${theme.breakpoints.md})`]: {
        boxShadow: `-2rem 0 2rem 2rem ${
          isCollapsed ? "transparent" : "#00000029"
        }`,
      },

      [`@media print`]: {
        backgroundColor: "transparent",
        margin: "auto",
        boxShadow: "none",
        maxWidth: "none",
        minWidth: "100%",
        width: "100% !important",
        paddingTop: "1rem",
      },
    }
  }
)

export const StyledSidebarNavContainer = styled.div(() => ({
  position: "relative",
}))

export interface StyledSidebarNavItemsProps {
  isExpanded: boolean
  isOverflowing: boolean
  hasSidebarElements: boolean
}

export const StyledSidebarNavItems = styled.ul<StyledSidebarNavItemsProps>(
  ({ isExpanded, isOverflowing, hasSidebarElements, theme }) => {
    const isExpandedMaxHeight = isExpanded ? "75vh" : "33vh"
    const maxHeight = hasSidebarElements ? isExpandedMaxHeight : "100vh"

    return {
      maxHeight,
      listStyle: "none",
      overflow: ["auto", "overlay"],
      margin: 0,
      // paddingTop: "0",
      paddingTop: theme.spacing.lg,
      paddingBottom: theme.spacing.lg,

      "@media print": {
        paddingTop: theme.spacing.sm,
      },

      "&::before": isOverflowing
        ? {
            content: '" "',
            backgroundImage: `linear-gradient(0deg, transparent, ${theme.colors.bgColor})`,
            width: "100%",
            height: "2rem",
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            pointerEvents: "none",
          }
        : null,

      "&::after": isOverflowing
        ? {
            content: '" "',
            backgroundImage: `linear-gradient(0deg, ${theme.colors.bgColor}, transparent)`,
            height: "2rem",
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            pointerEvents: "none",
          }
        : null,
    }
  }
)

export interface StyledSidebarNavSeparatorContainerProps {
  isExpanded: boolean
  isOverflowing: boolean
}

const bounceAnimation = keyframes`
  from, to {
    transform: translateY(0);
  }

  50% {
    transform: translateY(-0.25rem);
  }
`

export const StyledSidebarNavSeparatorContainer =
  styled.div<StyledSidebarNavSeparatorContainerProps>(
    ({ isExpanded, isOverflowing, theme }) => ({
      cursor: isExpanded || isOverflowing ? "pointer" : "default",
      position: "absolute",
      height: theme.spacing.lg,
      left: 0,
      right: 0,
      bottom: 0,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      color: theme.colors.fadedText60,
      borderBottom: `1px solid ${theme.colors.fadedText10}`,
      transition: "color 500ms",

      // ...((isExpanded || isOverflowing) && {
      //   "&:hover": {
      //     color: theme.colors.bodyText,
      //     background: `linear-gradient(0deg, ${theme.colors.darkenedBgMix15}, transparent)`,

      //     "& > *": {
      //       animation: `${bounceAnimation} 0.5s ease infinite`,
      //     },
      //   },
      // }),
    })
  )

export const StyledSidebarNavLinkContainer = styled.div(() => ({
  display: "flex",
  flexDirection: "column",
}))

export interface StyledSidebarNavLinkProps {
  isActive: boolean
}

export const StyledSidebarNavLink = styled.a<StyledSidebarNavLinkProps>(
  ({ isActive, theme }) => {
    const defaultPageLinkStyles = {
      textDecoration: "none",
      fontWeight: isActive ? 600 : 400,
    }

    return {
      ...defaultPageLinkStyles,
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      gap: theme.spacing.sm,
      borderRadius: theme.spacing.twoXS,

      paddingLeft: theme.spacing.sm,
      paddingRight: theme.spacing.sm,
      marginLeft: theme.spacing.lg,
      marginRight: theme.spacing.lg,
      marginTop: theme.spacing.threeXS,
      marginBottom: theme.spacing.threeXS,
      lineHeight: theme.lineHeights.menuItem,

      backgroundColor: isActive ? theme.colors.darkenedBgMix15 : "transparent",

      "&:hover": {
        backgroundColor: isActive
          ? theme.colors.darkenedBgMix25
          : theme.colors.darkenedBgMix15,
      },

      "&:active,&:visited,&:hover": {
        ...defaultPageLinkStyles,
      },

      "&:focus": {
        outline: "none",
      },

      "&:focus-visible": {
        backgroundColor: theme.colors.darkenedBgMix15,
      },

      [`@media print`]: {
        paddingLeft: theme.spacing.none,
      },
    }
  }
)

export const StyledSidebarLinkText = styled.span<StyledSidebarNavLinkProps>(
  ({ isActive, theme }) => ({
    color: isActive ? theme.colors.bodyText : theme.colors.fadedText60,
    overflow: "hidden",
    whiteSpace: "nowrap",
    textOverflow: "ellipsis",
    display: "table-cell",
  })
)

export interface StyledSidebarUserContentProps {
  hasPageNavAbove: boolean
}

export const StyledSidebarUserContent =
  styled.div<StyledSidebarUserContentProps>(({ hasPageNavAbove, theme }) => ({
    paddingTop: hasPageNavAbove ? theme.spacing.lg : "0",
    paddingBottom: theme.sizes.sidebarTopSpace,
    paddingLeft: theme.spacing.twoXL,
    paddingRight: theme.spacing.twoXL,

    "@media print": {
      paddingTop: `1rem`,
    },

    ...getWrappedHeadersStyle(theme),
  }))

export interface StyledSidebarContentProps {
  hideScrollbar: boolean
}

export const StyledSidebarContent = styled.div<StyledSidebarContentProps>(
  ({ hideScrollbar }) => ({
    position: "relative",
    height: "100%",
    width: "100%",
    overflow: hideScrollbar ? "hidden" : ["auto", "overlay"],
  })
)

export const StyledSidebarCloseButton = styled.div(({ theme }) => ({
  position: "absolute",
  top: theme.spacing.xs,
  right: theme.spacing.twoXS,
  zIndex: 1,

  "&:hover button": {
    backgroundColor: transparentize(theme.colors.fadedText60, 0.5),
  },

  [`@media print`]: {
    display: "none",
  },
}))

export interface StyledSidebarCollapsedControlProps {
  chevronDownshift: number
  isCollapsed: boolean
}

export const StyledSidebarCollapsedControl =
  styled.div<StyledSidebarCollapsedControlProps>(
    ({ chevronDownshift, isCollapsed, theme }) => ({
      position: "fixed",
      top: chevronDownshift ? `${chevronDownshift}px` : theme.spacing.sm,
      left: isCollapsed ? theme.spacing.twoXS : `-${theme.spacing.twoXS}`,
      zIndex: theme.zIndices.header,

      transition: "left 300ms",
      transitionDelay: "left 300ms",

      color: theme.colors.bodyText,

      [`@media (max-width: ${theme.breakpoints.md})`]: {
        color: theme.colors.bodyText,
      },

      [`@media print`]: {
        display: "none",
      },
    })
  )

export const StyledResizeHandle = styled.div(({ theme }) => ({
  position: "absolute",
  width: "8px",
  height: "100%",
  cursor: "col-resize",
  zIndex: theme.zIndices.sidebarMobile,

  "&:hover": {
    backgroundImage: `linear-gradient(to right, transparent 20%, ${theme.colors.fadedText20} 28%, transparent 36%)`,
  },
}))

export const StyledSidebarOpenContainer = styled.div(({ theme }) => ({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "start",
  padding: `${theme.spacing.twoXL} 0 0 ${theme.spacing.twoXL}`,
}))

export const StyledSidebarOpenButtonContainer = styled.div(({ theme }) => ({
  zIndex: theme.zIndices.header,
  marginLeft: theme.spacing.sm,
  height: "5rem",
}))

export const StyledSidebarHeaderContainer = styled.div(({ theme }) => ({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "start",
  padding: `${theme.spacing.twoXL}`,
}))

export interface StyledLogoProps {
  size: string
}

export const StyledLogo = styled.img<StyledLogoProps>(({ theme, size }) => {
  const logoHeight = size === "fixed" ? "1.5rem" : "auto"

  return {
    height: logoHeight,
    margin: "0.5rem 0 0.5rem 0",
    zIndex: theme.zIndices.header,
  }
})

export const StyledNoLogoSpacer = styled.div(({}) => ({
  height: "2rem",
}))

export interface StyledCollapseSidebarButtonProps {
  showSidebarCollapse: boolean
}

export const StyledCollapseSidebarButton =
  styled.div<StyledCollapseSidebarButtonProps>(({ showSidebarCollapse }) => ({
    display: showSidebarCollapse ? "auto" : "none",
    transition: "left 300ms",
    transitionDelay: "left 300ms",
  }))

export const StyledViewButton = styled.button(({ theme }) => ({
  fontSize: theme.fontSizes.sm,
  lineHeight: "1.4rem",
  color: theme.colors.gray60,
  backgroundColor: theme.colors.transparent,
  border: "none",
  boxShadow: "none",
  position: "relative",
  bottom: "12px",
  left: "12px",
  "&:hover, &:active, &:focus": {
    border: "none",
    outline: "none",
    boxShadow: "none",
  },
  "&:hover": {
    color: theme.colors.primary,
  },
}))
