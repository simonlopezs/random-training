import MonkeySquats from './MonkeySquats.vue'
import MonkeyPushups from './MonkeyPushups.vue'
import MonkeyPullups from './MonkeyPullups.vue'
import MonkeyBurpees from './MonkeyBurpees.vue'
import MonkeyDips from './MonkeyDips.vue'
import MonkeyLegRaises from './MonkeyLegRaises.vue'
import MonkeyMountainClimbers from './MonkeyMountainClimbers.vue'
import MonkeyJumpingJacks from './MonkeyJumpingJacks.vue'
import MonkeyPlank from './MonkeyPlank.vue'
import MonkeyLunges from './MonkeyLunges.vue'
import type { Component } from 'vue'

export const monkeyIcons: Record<string, Component> = {
  squats: MonkeySquats,
  pushups: MonkeyPushups,
  pullups: MonkeyPullups,
  burpees: MonkeyBurpees,
  dips: MonkeyDips,
  'leg-raises': MonkeyLegRaises,
  'mountain-climbers': MonkeyMountainClimbers,
  'jumping-jacks': MonkeyJumpingJacks,
  plank: MonkeyPlank,
  lunges: MonkeyLunges,
}
