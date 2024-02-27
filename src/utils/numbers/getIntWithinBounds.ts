import { CONFIG_DEPTH_MAX, CONFIG_DEPTH_MIN } from '../../constants/config'

export const getIntWithinBounds = (
  num: number,
  min: number = CONFIG_DEPTH_MIN,
  max: number = CONFIG_DEPTH_MAX
): number => Math.min(Math.max(num, min), max)
