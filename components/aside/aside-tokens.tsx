import type { MotionProps } from 'framer-motion';
import { useAccount } from 'wagmi';

export const variants: MotionProps = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  transition: { duration: 0.8 }
};

type AsideTokensProps = {
  tokenVal?: number;
};
export function AsideTokens({ tokenVal }: AsideTokensProps): JSX.Element {
  return (
    <section
      className={'hover-animation rounded-2xl bg-main-sidebar-background'}
    >
      <div className='ml-5 mr-5 flex flex-row justify-between pt-2 pb-1'>
        <p>$CHINESE Price</p>
        <p>≈$0.315 USD</p>
      </div>
      <div className='ml-5 mr-5 flex flex-row justify-between pt-1 pb-2'>
        <p>Your $CHINESE</p>
        <p>100≈$31.5 USD</p>
      </div>
    </section>
  );
}
