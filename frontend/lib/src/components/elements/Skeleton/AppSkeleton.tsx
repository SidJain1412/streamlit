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

import React, { ReactElement, useState, useEffect, memo } from "react"

import { Skeleton as SkeletonProto } from "@streamlit/lib/src/proto"

import {
  StyledSkeleton,
  TitleSkeleton,
  ParagraphSkeleton,
  TextLineSkeleton,
  SquareSkeleton,
} from "./styled-components"

const SHOW_DELAY_MS = 500

function RawAppSkeleton({
  element,
}: {
  element: SkeletonProto
}): ReactElement {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(true)
    }, SHOW_DELAY_MS)

    return () => {
      clearTimeout(timer)
    }
  }, [])

  if (!visible) return <></>

  return (
    <StyledSkeleton data-testid="stAppSkeleton">
      <TitleSkeleton />
      <ParagraphSkeleton>
        <TextLineSkeleton width="98%" />
        <TextLineSkeleton width="100%" />
        <TextLineSkeleton width="96%" />
        <TextLineSkeleton width="65%" />
      </ParagraphSkeleton>
      <SquareSkeleton width="75%" height={element.height + "pt"} />
    </StyledSkeleton>
  )
}

export const AppSkeleton = memo(RawAppSkeleton)
