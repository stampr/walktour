import * as React from 'react';
import { WalktourLogic } from './Walktour';
import { WalktourStyles } from '../defaultstyles';

interface TooltipProps extends WalktourLogic {
  nextLabel: string;
  prevLabel: string;
  skipLabel: string;
  styles: WalktourStyles;
  width?: number;
}

export function Tooltip(props: TooltipProps) {
  const {
    next,
    prev,
    close,
    stepContent: {
      title,
      description,
      customTitleRenderer,
      customDescriptionRenderer,
      customFooterRenderer
    },
    stepIndex,
    allSteps,
    styles,
    nextLabel,
    prevLabel,
    skipLabel,
    width
  } = props;

  const tooltipStyle: React.CSSProperties = {
    ...styles.tooltip,
    width: width
  }
  return (
    <div style={tooltipStyle}>
      {customTitleRenderer
        ? customTitleRenderer(title, props)
        : (
          <div style={styles.title}>
            {title}
          </div>
        )
      }

      {customDescriptionRenderer
        ? customDescriptionRenderer(description, props)
        : (
          <div style={styles.description}>
            {description}
          </div>
        )
      }

      {customFooterRenderer
        ? customFooterRenderer(props)
        : (
          <div style={styles.footer}>
            <button onClick={close} style={styles.tertiaryButton}>
              {skipLabel}
            </button>
            <button
              onClick={prev}
              disabled={stepIndex === 0}
              style={stepIndex !== 0 ? styles.secondaryButton : styles.disabledButton}
            >
              {prevLabel}
            </button>
            <button
              onClick={next}
              disabled={stepIndex + 1 === allSteps.length}
              style={stepIndex + 1 !== allSteps.length ? styles.primaryButton : styles.disabledButton}
            >
              {nextLabel}
            </button>
          </div>
        )}
    </div>
  )
}