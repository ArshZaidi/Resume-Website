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
            <div className="realm-transition__num" data-anim="num">
              {state.number}
            </div>
          )}
          <span className="realm-transition__rule" data-anim="rule" />
          {state.title && (
            <div className="realm-transition__title" data-anim="title">
              {state.title}
            </div>
          )}
          {state.subtitle && (
            <div className="realm-transition__sub" data-anim="sub">
              {state.subtitle}
            </div>
          )}
        </div>
      </div>
    );
  }
);

export default RealmTransition;