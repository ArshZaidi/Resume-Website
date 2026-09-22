"use client";

import { forwardRef } from "react";

export interface TransitionState {
  active: boolean;
  number?: string;
  title?: string;
  subtitle?: string;
}

interface Props {
  state: TransitionState;
}

/**
 * Full-screen overlay used during station boarding.
 * Renders nothing when inactive.
 */
const RealmTransition = forwardRef<HTMLDivElement, Props>(
  function RealmTransition({ state }, ref) {
    return (
      <div
        ref={ref}
        className="realm-transition"
        data-active={state.active}
        aria-hidden="true"
      >
        <div className="realm-transition__bg" />

        <div className="realm-transition__rails">
          <span className="realm-transition__rail" />
          <span className="realm-transition__rail" />
          <span className="realm-transition__rail" />
        </div>

        <div className="realm-transition__content">
          {state.number && (
            <div className="realm-transition__num">{state.number}</div>
          )}
          {state.title && (
            <div className="realm-transition__title">{state.title}</div>
          )}
          {state.subtitle && (
            <div className="realm-transition__sub">{state.subtitle}</div>
          )}
        </div>
      </div>
    );
  }
);

export default RealmTransition;