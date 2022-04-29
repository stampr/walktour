import * as React from 'react';
import { WalktourLogic } from './Walktour';
import { WalktourStyles, defaultStyles, minimalStyles } from '../defaultstyles';

interface TooltipProps extends WalktourLogic {
  styles?: WalktourStyles;
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
      customFooterRenderer,
      disableClose,
      disableNext,
      disablePrev,
      nextLabel,
      prevLabel,
      closeLabel,
    },
    stepIndex,
    allSteps,
    styles,
  } = {
    styles: props.stepContent.useMinimalStyles ? minimalStyles : defaultStyles,
    ...props
  };

  const tooltipStyle: React.CSSProperties = {
    ...styles.tooltip,
  }

  const prevDisabled: boolean = disablePrev !== undefined ? disablePrev : stepIndex === 0;
  const nextDisabled: boolean = disableNext !== undefined ? disableNext : stepIndex + 1 === allSteps.length;

  return (
    <div className="walktour-tooltip" style={tooltipStyle}>
      {customTitleRenderer
        ? customTitleRenderer(title, props)
        : (title &&
          <div className="walktour-tooltip--title" style={styles.title}>
            {title}
          </div>
        )
      }

      {customDescriptionRenderer
        ? customDescriptionRenderer(description, props)
        : (
          <div className="walktour-tooltip--description" style={styles.description}>
            {description}
          </div>
        )
      }

      {customFooterRenderer
        ? customFooterRenderer(props)
        : (
          <div className="walktour-tooltip--footer" style={styles.footer}>
            <button 
              className="walktour-tooltip--tertiary"
              onClick={() => close()} 
              style={{...styles.tertiaryButton, ...disableClose && styles.disabledButton}}
              disabled={disableClose}
            >
              {closeLabel || "close"}
            </button>
            <button
              className="walktour-tooltip--secondary"
              onClick={prev}
              disabled={prevDisabled}
              style={{...styles.secondaryButton, ...prevDisabled && styles.disabledButton}}
            >
              {prevLabel || "prev"}
            </button>
            <button
              className="walktour-tooltip--primary"
              onClick={() => next()}
              disabled={nextDisabled}
              style={{...styles.primaryButton, ...nextDisabled && styles.disabledButton}}
            >
              {nextLabel || "next"}
            </button>
          </div>
        )}
    </div>
  )
}