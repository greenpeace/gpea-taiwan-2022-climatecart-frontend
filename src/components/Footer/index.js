import styled from 'styled-components';
import { imgUrl } from '../../utils/imgUrlWrapper';
import { respondTo } from '../../utils/responsive';

import Icons from '../Icons';
import LinkWrapper from '../LinkWrapper';
import EpaperSubscribe from './EpaperSubscribe';
import ToTopButton from './ToTopButton';

const Footer = () => {
    return (
        <StyledFooter>
            <img className="logo" src={imgUrl('/img/logo.svg')} alt='GREENPLACE 綠色和平' />

            <div className='sub-container'>
                <div>
                    <Contacts>
                        <ContactList>
                            <ContactItem label='Email' value=' inquiry.tw@greenpeace.org' />
                            <ContactItem label='電話' value='(02) 2361 2351' />
                            <ContactItem label='地址' value='臺北市中正區重慶南路一段 109 號' />
                        </ContactList>
                        <ContactList>
                            <ContactItem label='統一編號' value='26324671' />
                            <ContactItem label='勸募許可' value='衛部救字第 1101363536 號' />
                            <ContactItem label='立案字號' value='環署綜字第 1000044076 號' />
                        </ContactList>
                    </Contacts>

                    <StyledEpaperSubscribe className="is--mobile" />

                    <FollowBlock>
                        <span>FOLLOW US ON</span>
                        <ul>
                            <FollowButton Icon={Icons.Facebook} label='Facebook' href='https://www.facebook.com/greenpeace.org.tw/' />
                            <FollowButton Icon={Icons.YouTube} label='YouTube' href='https://www.youtube.com/channel/UCuxqIuQqkmKzaf4q3RnXqWg' />
                            <FollowButton Icon={Icons.Instagram} label='Instagram' href='https://www.instagram.com/greenpeace_tw/?hl=zh-tw' />
                            <FollowButton Icon={Icons.Line} label='Line' href='https://page.line.me/784kpkzx' />
                        </ul>
                    </FollowBlock>

                    <nav>
                        <PrivacyLink to={'/contact-us'}>聯絡我們</PrivacyLink>
                        <PrivacyLink to={'/privacy'}>隱私權政策頁</PrivacyLink>
                    </nav>

                    <Copyright>© 2022 Greenpeace. All Rights Reserved.</Copyright>
                </div>

                <StyledEpaperSubscribe className="is--pc" />
            </div>

            <ToTopButton />

        </StyledFooter>
    )
}

const ContactItem = ({ label, value, href }) => (
    <StyledContactItem>
        <span className='label'>{label}</span>
        {href ?
            <a className='value' href={href} target='_blank' rel='noreferrer'>{value}</a> :
            <span className='value'>{value}</span>
        }
    </StyledContactItem>
)

const FollowButton = ({ label, Icon, href }) => (
    <StyledFollowButton href={href} target='_blank' rel='noreferrer' alt={label} aria-label={label}>
        <Icon />
    </StyledFollowButton>
)

const StyledFooter = styled.footer`
    position: relative;

    padding: 48px 80px;
    background-color: var(--green-400);
    color: var(--white-100);
    font-size: 14px;

    background-image: url(${ imgUrl('/img/footer-deco.svg') });
    background-repeat: no-repeat;
    background-position: calc(100% - 16px) calc(100% - 16px);
    
    .sub-container {
        margin-top: 28px;
        display: flex;
        /* grid-template-columns: repeat(2, 1fr); */
        gap: 80px;
    }

    a:hover {
        color: var(--primary);
    }

    ${respondTo.xl} {
        .sub-container {
            grid-template-columns: 1.3fr 1fr;
        }
    }

    ${respondTo.pad} {
        padding: 32px 20px;

        .logo {
            max-width: 100%;
        }

        .sub-container {
            grid-template-columns: 1fr 1fr;
            gap: 40px;
        }
    }

    ${ respondTo.md } {
        padding: 32px 16px;
        .sub-container {
            grid-template-columns: 1fr;
        }
    }

    ${ respondTo.sm } {
        background-position: calc(100% - 16px) calc(100% - 64px);
        background-size: 30%;
    }

`

const Contacts = styled.div`
    display: flex;

    ${respondTo.lg} {
        flex-direction: column;
        gap: 0.5em;
    }
`

const ContactList = styled.ul`
    margin-left: 54px;
    &:first-child { margin-left: 0; }

    ${respondTo.lg} {
        margin-left: 0;
    }
`

const StyledContactItem = styled.li`
    
    margin-top: 8px;
    &:first-child { margin-top: 0; }

    >* { 
        display: inline-block;
    }

    .label {
        min-width: 64px;
        font-weight: 700;
    }

    .value {
        margin-left: 8px;
    }
`

const FollowBlock = styled.div`
    margin-top: 40px;

    display: flex;
    align-items: center;

    ${respondTo.pad} {
        flex-direction: column;
        align-items: flex-start;
        gap: 24px;
    }

    >ul {
        margin-left: 20px;

        ${respondTo.pad} {
            margin-left: 0;
        }
    }
`

const StyledFollowButton = styled.a`
    margin-left: 28px;
    &:first-child { margin-left: 0; }
`

const PrivacyLink = styled(LinkWrapper)`
    display: inline-block;
    margin-top: 40px;
    text-decoration: underline;
    
    margin-left: 20px;
    &:first-child { margin-left: 0; }
`

const Copyright = styled.div`
    margin-top: 20px;
`

const StyledEpaperSubscribe = styled(EpaperSubscribe)`

    &.is--pc {

        ${respondTo.md} {
            display: none !important;
        }
    }

    &.is--mobile {
        display: none !important;
        margin: 40px 0;

        ${respondTo.md} {
            display: block !important;
        }
    }
`

export default Footer