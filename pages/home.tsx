import { useWindow } from '@lib/context/window-context';
import { HomeLayout, ProtectedLayout } from '@components/layout/common-layout';
import { MainLayout } from '@components/layout/main-layout';
import { SEO } from '@components/common/seo';
import { MainContainer } from '@components/home/main-container';
import { Input } from '@components/input/input';
import { MainHeader } from '@components/home/main-header';
import { useState } from 'react';
import type { ReactElement, ReactNode } from 'react';
import Switch from 'react-switch';
import { useTranslation } from 'react-i18next';



export default function Home(): JSX.Element {
  const { isMobile } = useWindow();
  const [followOnTwitter, setFollowOnTwitter] = useState(false);
  const [joinDiscord, setJoinDiscord] = useState(false);
  const [subscribeEmail, setSubscribeEmail] = useState(false);
  const [retweet, setRetweet] = useState(false);
  const {t,i18n} =useTranslation();

  function SetFollowOnTwitter() {
    setFollowOnTwitter(!followOnTwitter);
  }
  function SetJoinDiscord() {
    setJoinDiscord(!joinDiscord);
  }
  function SetSubscribeEmail() {
    setSubscribeEmail(!subscribeEmail);
  }
  function SetRetweet() {
    setRetweet(!retweet);
  }
  const [checked, setChecked] = useState(false);
  return (
    <MainContainer>
      <SEO title='Home / Chinese.org' />
      <MainHeader
        useMobileSidebar
        title='Home'
        className='flex items-center justify-between'
      >
        {/* <UpdateUsername /> username is wallet address, can't change */}
      </MainHeader>
      {!isMobile && <Input />}
      <section className='mt-0.5 grid h-[500px] grid-cols-2 grid-rows-2 gap-4 bg-main-sidebar-background xs:mt-0'>
        <button
          className="ml-1 flex flex-col items-center bg-[url('/assets/memo3.jpg')] bg-contain bg-no-repeat"
          onClick={SetFollowOnTwitter}
        >
          <h1 className='mt-7 mb-5 font-mono text-2xl italic'>{t('Task')} 1</h1>
          <div className='flex flex-row'>
            <p className=' mr-2 font-mono italic'>{t('Follow Chinese.org on')}</p>
            <button>
              <img
                className='mr-4 w-[30px] rounded'
                src='/assets/twitter-avatar.jpg'
              ></img>
            </button>
          </div>
          <p className='mt-4 font-mono italic'>{t('to get 100 $CHINESE token !')}</p>
          <Switch
            className='mt-10 ml-[-10px]'
            uncheckedIcon={false}
            onChange={setChecked}
            checked={followOnTwitter}
          ></Switch>
        </button>

        <button
          className="ml-1 flex flex-col items-center bg-[url('/assets/memo3.jpg')] bg-contain bg-no-repeat"
          onClick={SetRetweet}
        >
          <h1 className='mt-7 mb-5 font-mono text-2xl italic'>{t('Task')} 2</h1>
          <div className='flex flex-row'>
            <p className=' mr-2 font-mono italic'>{t('Retweet Chinese.org on')}</p>
            <button>
              <img
                className='mr-4 w-[30px] rounded'
                src='/assets/twitter-avatar.jpg'
              ></img>
            </button>
          </div>
          <p className='mt-4 font-mono italic'>{t('to get 100 $CHINESE token !')}</p>
          <Switch
            className='mt-10 ml-[-10px]'
            uncheckedIcon={false}
            onChange={setChecked}
            checked={retweet}
          ></Switch>
        </button>

        <button
          className="ml-1 flex flex-col items-center bg-[url('/assets/memo3.jpg')] bg-contain bg-no-repeat"
          onClick={SetJoinDiscord}
        >
          <h1 className='mt-7 mb-5 font-mono text-2xl italic'>{t('Task')} 3</h1>
          <div className='flex flex-row'>
            <p className=' mr-2 font-mono italic'>{t('Join Chinese.org in')}</p>
            <button>
              <img
                className='mr-4 w-[30px] rounded'
                src='/assets/discord.png'
              ></img>
            </button>
          </div>
          <p className='mt-4 font-mono italic'>{t('to get 100 $CHINESE token !')}</p>
          <Switch
            className='mt-10 ml-[-10px]'
            uncheckedIcon={false}
            onChange={setChecked}
            checked={joinDiscord}
          ></Switch>
        </button>

        <button
          className="ml-1 flex flex-col items-center bg-[url('/assets/memo3.jpg')] bg-contain bg-no-repeat"
          onClick={SetSubscribeEmail}
        >
          <h1 className='mt-7 mb-5 font-mono text-2xl italic'>{t('Task')} 4</h1>
          <div className='flex flex-row'>
            <p className='mr-2 font-mono italic'>{t('Subscribe newsletter')}</p>
            <button>
              <img
                className='mr-4 w-[30px] rounded'
                src='/assets/email.png'
              ></img>
            </button>
          </div>
          <p className='mt-4 font-mono italic'>{t('to get 100 $CHINESE token !')}</p>
          <Switch
            className='mt-10 ml-[-10px]'
            uncheckedIcon={false}
            onChange={setChecked}
            checked={subscribeEmail}
          ></Switch>
        </button>

        {/* {loading ? (
          <Loading className='mt-5' />
        ) : !data ? (
          <Error message='Something went wrong' />
        ) : (
          <>
            <AnimatePresence mode='popLayout'>
              {data.map((tweet) => (
                <Tweet {...tweet} key={tweet.id} />
              ))}
            </AnimatePresence>
            <LoadMore />
          </>
        )} */}
      </section>
    </MainContainer>
  );
}

Home.getLayout = (page: ReactElement): ReactNode => (
  <ProtectedLayout>
    <MainLayout>
      <HomeLayout>{page}</HomeLayout>
    </MainLayout>
  </ProtectedLayout>
);





