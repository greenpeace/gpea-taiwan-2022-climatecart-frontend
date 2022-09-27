export const 節能 = ({ active = false, ...props }) => (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" {...props}>
        <path d="M10.8333 8.33328H16.6666L9.16658 19.1666V11.6666H3.33325L10.8333 0.833282V8.33328Z"
            fill={active ? 'var(--green-100)' : 'var(--grey)'} />
    </svg>
)

export const 舒適 = ({ active = false, ...props }) => (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" {...props}>
        <path d="M16.6666 16.6667C16.6666 16.8877 16.5788 17.0996 16.4225 17.2559C16.2662 17.4122 16.0543 17.5 15.8333 17.5H4.16659C3.94557 17.5 3.73361 17.4122 3.57733 17.2559C3.42105 17.0996 3.33325 16.8877 3.33325 16.6667V9.8637C3.33325 9.47874 3.02118 9.16667 2.63622 9.16667C1.99911 9.16667 1.69592 8.38244 2.16735 7.95388L9.43909 1.34334C9.59251 1.20374 9.79249 1.12637 9.99992 1.12637C10.2074 1.12637 10.4073 1.20374 10.5608 1.34334L17.8325 7.95387C18.3039 8.38244 18.0007 9.16667 17.3636 9.16667C16.9787 9.16667 16.6666 9.47874 16.6666 9.8637V16.6667ZM9.99992 10.8333C9.53968 10.8333 9.16659 11.2064 9.16659 11.6667V15C9.16659 15.4602 9.53968 15.8333 9.99992 15.8333C10.4602 15.8333 10.8333 15.4602 10.8333 15V11.6667C10.8333 11.2064 10.4602 10.8333 9.99992 10.8333Z"
            fill={active ? 'var(--cyan)' : 'var(--grey)'} />
    </svg>
)

export const 省錢 = ({ active = false, ...props }) => (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" {...props}>
        <path d="M10.0001 18.3333C5.39758 18.3333 1.66675 14.6025 1.66675 9.99999C1.66675 5.39749 5.39758 1.66666 10.0001 1.66666C14.6026 1.66666 18.3334 5.39749 18.3334 9.99999C18.3334 14.6025 14.6026 18.3333 10.0001 18.3333ZM7.91675 11.6667C7.45651 11.6667 7.08341 12.0398 7.08341 12.5C7.08341 12.9602 7.45651 13.3333 7.91675 13.3333H8.33341C8.79365 13.3333 9.16675 13.7064 9.16675 14.1667C9.16675 14.6269 9.53984 15 10.0001 15C10.4603 15 10.8334 14.6269 10.8334 14.1667C10.8334 13.7064 11.2065 13.3333 11.6667 13.3333C12.2193 13.3333 12.7492 13.1138 13.1399 12.7231C13.5306 12.3324 13.7501 11.8025 13.7501 11.25C13.7501 10.6975 13.5306 10.1676 13.1399 9.77685C12.7492 9.38615 12.2193 9.16666 11.6667 9.16666H8.33341C8.22291 9.16666 8.11693 9.12276 8.03879 9.04462C7.96065 8.96648 7.91675 8.8605 7.91675 8.74999C7.91675 8.63948 7.96065 8.5335 8.03879 8.45536C8.11693 8.37722 8.22291 8.33332 8.33341 8.33332H12.0834C12.5437 8.33332 12.9167 7.96023 12.9167 7.49999C12.9167 7.03975 12.5437 6.66666 12.0834 6.66666H11.6667C11.2065 6.66666 10.8334 6.29356 10.8334 5.83332C10.8334 5.37309 10.4603 4.99999 10.0001 4.99999C9.53984 4.99999 9.16675 5.37309 9.16675 5.83332C9.16675 6.29356 8.79365 6.66666 8.33341 6.66666C7.78088 6.66666 7.25098 6.88615 6.86028 7.27685C6.46957 7.66755 6.25008 8.19746 6.25008 8.74999C6.25008 9.30252 6.46957 9.83243 6.86028 10.2231C7.25098 10.6138 7.78088 10.8333 8.33341 10.8333H11.6667C11.7773 10.8333 11.8832 10.8772 11.9614 10.9554C12.0395 11.0335 12.0834 11.1395 12.0834 11.25C12.0834 11.3605 12.0395 11.4665 11.9614 11.5446C11.8832 11.6228 11.7773 11.6667 11.6667 11.6667H7.91675Z"
            fill={active ? 'var(--yellow)' : 'var(--grey)'} />
    </svg>
)

export const 社福 = ({ active = false, ...props }) => (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" {...props}>
        <path d="M11.7674 8.73331C11.6111 8.57709 11.3992 8.48933 11.1782 8.48933C10.9572 8.48933 10.7453 8.57709 10.5891 8.73331L9.99989 9.32165C9.84614 9.48083 9.66223 9.6078 9.45889 9.69515C9.25555 9.7825 9.03685 9.82847 8.81555 9.8304C8.59426 9.83232 8.37479 9.79015 8.16996 9.70635C7.96514 9.62255 7.77905 9.49879 7.62256 9.3423C7.46607 9.18582 7.34232 8.99973 7.25852 8.7949C7.17471 8.59008 7.13254 8.37061 7.13447 8.14931C7.13639 7.92801 7.18237 7.70931 7.26972 7.50597C7.35706 7.30263 7.48403 7.11872 7.64322 6.96498L12.3349 2.27165C13.4457 2.019 14.6078 2.12298 15.6561 2.56879C16.7044 3.01461 17.5854 3.77956 18.174 4.75489C18.7625 5.73022 19.0286 6.86627 18.9343 8.0015C18.8401 9.13674 18.3904 10.2134 17.6491 11.0783L15.8924 12.8575L11.7674 8.73248V8.73331ZM2.63405 3.72331C3.49635 2.86113 4.62423 2.31496 5.83535 2.17312C7.04647 2.03127 8.27003 2.30204 9.30822 2.94165L6.46405 5.78665C5.84805 6.40142 5.49691 7.23273 5.48567 8.10295C5.47442 8.97316 5.80396 9.81327 6.40387 10.4438C7.00378 11.0742 7.82648 11.4451 8.69618 11.4771C9.56588 11.5091 10.4136 11.1997 11.0582 10.615L11.1782 10.5008L14.7141 14.0358L11.1782 17.5716C10.8657 17.8841 10.4418 18.0596 9.99989 18.0596C9.55795 18.0596 9.1341 17.8841 8.82155 17.5716L2.63322 11.3833C1.6175 10.3675 1.04687 8.98982 1.04688 7.55331C1.04687 6.1168 1.6175 4.73912 2.63322 3.72331H2.63405Z" 
            fill={active ? '#FFA9A9' : 'var(--grey)'}/>
    </svg>
)

export const 空氣清新 = ({ active = false, ...props }) => (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" {...props}>
        <path d="M17.5 2.5V4.16667C17.5 12.1892 13.0225 15.8333 7.5 15.8333H5.915C6.09167 13.3233 6.87333 11.8042 8.91333 9.99917C9.91667 9.11167 9.83167 8.59917 9.3375 8.89333C5.93417 10.9183 4.24417 13.655 4.16917 18.025L4.16667 18.3333H2.5C2.5 17.1975 2.59667 16.1667 2.78833 15.2233C2.59667 14.145 2.5 12.6817 2.5 10.8333C2.5 6.23083 6.23083 2.5 10.8333 2.5C12.5 2.5 14.1667 3.33333 17.5 2.5Z" 
            fill={active ? 'var(--green-100)' : 'var(--grey)'} />
    </svg>
)

export const 放鬆 = ({ active = false, ...props }) => (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" {...props}>
        <path d="M18.3332 9.16668V16.6667H16.6665V14.1667H3.33317V16.6667H1.6665V3.33334H3.33317V11.6667H9.99984V5.83334H14.9998C15.8839 5.83334 16.7317 6.18453 17.3569 6.80965C17.982 7.43478 18.3332 8.28262 18.3332 9.16668ZM6.6665 10.8333C6.00346 10.8333 5.36758 10.57 4.89874 10.1011C4.4299 9.63227 4.1665 8.99638 4.1665 8.33334C4.1665 7.6703 4.4299 7.03442 4.89874 6.56558C5.36758 6.09674 6.00346 5.83334 6.6665 5.83334C7.32955 5.83334 7.96543 6.09674 8.43427 6.56558C8.90311 7.03442 9.1665 7.6703 9.1665 8.33334C9.1665 8.99638 8.90311 9.63227 8.43427 10.1011C7.96543 10.57 7.32955 10.8333 6.6665 10.8333Z" 
            fill={active ? '#62CBD7' : 'var(--grey)'}/>
    </svg>
)

export const 公民參與 = ({ active = false, ...props }) => (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" {...props}>
        <path d="M6.34736 7.26L9.01819 5.32C9.31801 5.10059 9.68269 4.98793 10.054 5C10.5069 5.01129 10.9451 5.16342 11.3076 5.43524C11.67 5.70705 11.9388 6.08504 12.0765 6.51667C12.2315 7.0025 12.3732 7.33083 12.5015 7.50167C12.8893 8.019 13.3923 8.43884 13.9706 8.72786C14.5489 9.01688 15.1867 9.16712 15.8332 9.16667V10.8333C14.9726 10.8343 14.1225 10.6444 13.3441 10.2774C12.5657 9.91038 11.8784 9.37535 11.3315 8.71083L10.7507 12.0067L12.4682 13.4483L14.3207 18.5383L12.754 19.1083L11.054 14.4383L8.22902 12.0675C7.99719 11.8803 7.81979 11.6344 7.71529 11.3553C7.61079 11.0762 7.58301 10.7743 7.63486 10.4808L8.05902 8.07667L7.49486 8.48667L5.72236 10.9267L4.37402 9.94667L6.33319 7.25L6.34736 7.26ZM11.2499 4.58333C10.8078 4.58333 10.3839 4.40774 10.0713 4.09518C9.75879 3.78262 9.58319 3.35869 9.58319 2.91667C9.58319 2.47464 9.75879 2.05072 10.0713 1.73816C10.3839 1.42559 10.8078 1.25 11.2499 1.25C11.6919 1.25 12.1158 1.42559 12.4284 1.73816C12.7409 2.05072 12.9165 2.47464 12.9165 2.91667C12.9165 3.35869 12.7409 3.78262 12.4284 4.09518C12.1158 4.40774 11.6919 4.58333 11.2499 4.58333ZM8.77319 15.5675L6.09486 18.7592L4.81819 17.6883L7.29819 14.7333L7.91986 12.9167L9.41236 14.1667L8.77319 15.5675Z" 
            fill={active ? 'var(--cyan)' : 'var(--grey)'} />
    </svg>
)

export const 就業力 = ({ active = false, ...props }) => (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" {...props}>
        <path d="M5.83317 4.16665V1.66665C5.83317 1.44563 5.92097 1.23367 6.07725 1.07739C6.23353 0.92111 6.44549 0.833313 6.6665 0.833313H13.3332C13.5542 0.833313 13.7661 0.92111 13.9224 1.07739C14.0787 1.23367 14.1665 1.44563 14.1665 1.66665V4.16665H17.4998C17.7208 4.16665 17.9328 4.25444 18.0891 4.41072C18.2454 4.567 18.3332 4.77897 18.3332 4.99998V16.6666C18.3332 16.8877 18.2454 17.0996 18.0891 17.2559C17.9328 17.4122 17.7208 17.5 17.4998 17.5H2.49984C2.27882 17.5 2.06686 17.4122 1.91058 17.2559C1.7543 17.0996 1.6665 16.8877 1.6665 16.6666V4.99998C1.6665 4.77897 1.7543 4.567 1.91058 4.41072C2.06686 4.25444 2.27882 4.16665 2.49984 4.16665H5.83317ZM3.33317 12.5V15.8333H16.6665V12.5H3.33317ZM9.1665 9.16665V10.8333H10.8332V9.16665H9.1665ZM7.49984 2.49998V4.16665H12.4998V2.49998H7.49984Z" 
            fill={active ? '#62CBD7' : 'var(--grey)'}/>
    </svg>
)

export const 綠色人才 = ({ active = false, ...props }) => (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" {...props}>
        <path d="M9.16683 11.7183V16.6666H10.8335V11.7183C14.1218 12.1283 16.6668 14.9333 16.6668 18.3333H3.3335C3.33352 16.7095 3.92615 15.1415 5.00017 13.9235C6.07418 12.7056 7.55575 11.9215 9.16683 11.7183ZM10.0002 10.8333C7.23766 10.8333 5.00016 8.59581 5.00016 5.83331C5.00016 3.07081 7.23766 0.833313 10.0002 0.833313C12.7627 0.833313 15.0002 3.07081 15.0002 5.83331C15.0002 8.59581 12.7627 10.8333 10.0002 10.8333Z" 
            fill={active ? '#66CC00' : 'var(--grey)'}/>
    </svg>
)

export const 安全性 = ({ active = false, ...props }) => (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" {...props}>
        <path d="M10 0.833313L16.8475 2.35498C17.0326 2.39612 17.198 2.49912 17.3167 2.64698C17.4353 2.79485 17.5 2.97874 17.5 3.16831V11.4908C17.4999 12.3139 17.2967 13.1243 16.9082 13.85C16.5198 14.5757 15.9582 15.1943 15.2733 15.6508L10 19.1666L4.72667 15.6508C4.04189 15.1943 3.48038 14.5759 3.09196 13.8504C2.70353 13.1248 2.5002 12.3146 2.5 11.4916V3.16831C2.50003 2.97874 2.5647 2.79485 2.68332 2.64698C2.80195 2.49912 2.96745 2.39612 3.1525 2.35498L10 0.833313ZM10 5.83331C9.63312 5.83333 9.2765 5.9544 8.98544 6.17774C8.69439 6.40109 8.48515 6.71423 8.3902 7.06861C8.29524 7.42298 8.31987 7.79879 8.46026 8.13774C8.60065 8.4767 8.84895 8.75986 9.16667 8.94331V12.5H10.8333L10.8342 8.94331C11.1519 8.75982 11.4003 8.47659 11.5407 8.13755C11.681 7.79851 11.7056 7.42263 11.6105 7.06821C11.5155 6.71379 11.3061 6.40064 11.0149 6.17736C10.7237 5.95408 10.3669 5.83315 10 5.83331Z" 
            fill={active ? '#62CBD7' : 'var(--grey)'}/>
    </svg>
)

export const 多元共融 = ({ active = false, ...props }) => (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" {...props}>
        <path d="M16.3017 10.0808L17.5775 12.2917C18.3834 13.6867 17.905 15.4708 16.5109 16.2758C16.0667 16.5317 15.5642 16.6667 15.0525 16.6667H13.3334V18.75L9.16671 15.8333L13.3334 12.9167V15H15.0517C15.2709 15 15.4867 14.9417 15.6767 14.8325C16.275 14.4875 16.4792 13.7225 16.135 13.125L14.8584 10.9142L16.3017 10.0808ZM6.08671 7.61168L6.52837 12.6783L4.72504 11.6367L3.86587 13.125C3.75587 13.315 3.69837 13.5308 3.69837 13.75C3.69837 14.44 4.25754 15 4.94837 15H7.50004V16.6667H4.94837C3.33754 16.6667 2.03171 15.3608 2.03171 13.75C2.03171 13.2383 2.16671 12.735 2.42254 12.2917L3.28087 10.8025L1.47754 9.76168L6.08587 7.61168H6.08671ZM11.4584 2.47418C11.9017 2.73001 12.27 3.09835 12.5259 3.54168L13.3842 5.02918L15.1892 3.98751L14.7475 9.05501L10.1375 6.90501L11.9417 5.86335L11.0825 4.37501C10.9725 4.18501 10.815 4.02751 10.625 3.91751C10.0275 3.57251 9.26254 3.77751 8.91754 4.37501L7.64087 6.58585L6.19754 5.75251L7.47504 3.54168C8.28004 2.14668 10.0642 1.66835 11.4592 2.47418H11.4584Z" 
            fill={active ? '#66CC00' : 'var(--grey)'}/>
    </svg>
)

export const 產業創新 = ({ active = false, ...props }) => (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" {...props}>
        <path d="M12.6869 12.9233L10.8427 16.7983C10.8078 16.8716 10.7556 16.9353 10.6906 16.9838C10.6256 17.0324 10.5498 17.0645 10.4696 17.0772C10.3895 17.0899 10.3074 17.0829 10.2306 17.0568C10.1538 17.0307 10.0844 16.9864 10.0286 16.9275L7.07689 13.8117C6.99803 13.7285 6.89301 13.675 6.77939 13.66L2.52356 13.1033C2.44315 13.0927 2.36653 13.0627 2.30029 13.0159C2.23406 12.9691 2.18021 12.9069 2.14339 12.8346C2.10656 12.7624 2.08786 12.6822 2.08891 12.6012C2.08995 12.5201 2.11071 12.4404 2.14939 12.3692L4.20106 8.59915C4.2556 8.49833 4.27384 8.38182 4.25272 8.26915L3.46689 4.04998C3.45197 3.97012 3.45673 3.88783 3.48076 3.81022C3.5048 3.73262 3.54738 3.66204 3.60483 3.60459C3.66228 3.54714 3.73286 3.50456 3.81046 3.48052C3.88807 3.45649 3.97036 3.45173 4.05022 3.46665L8.26939 4.25248C8.38206 4.2736 8.49856 4.25536 8.59939 4.20082L12.3694 2.14915C12.4407 2.11046 12.5204 2.08972 12.6016 2.08872C12.6827 2.08772 12.7629 2.10649 12.8352 2.14341C12.9075 2.18033 12.9697 2.23428 13.0164 2.30062C13.0632 2.36695 13.0931 2.44367 13.1036 2.52415L13.6602 6.77915C13.6752 6.89277 13.7287 6.99779 13.8119 7.07665L16.9277 10.0283C16.9866 10.0842 17.031 10.1535 17.0571 10.2304C17.0831 10.3072 17.0901 10.3892 17.0774 10.4694C17.0647 10.5495 17.0327 10.6254 16.9841 10.6904C16.9355 10.7554 16.8718 10.8076 16.7986 10.8425L12.9236 12.6867C12.8198 12.736 12.7362 12.8196 12.6869 12.9233ZM13.3511 14.5292L14.5294 13.3508L18.0652 16.8858L16.8861 18.065L13.3511 14.5292Z" 
            fill={active ? '#FFD86F' : 'var(--grey)'}/>
    </svg>
)

export const 新鮮食材 = ({ active = false, ...props }) => (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" {...props}>
        <path d="M18.3332 5.83333V7.91667C18.3332 10.9083 15.9082 13.3333 12.9165 13.3333H10.8332V17.5H9.1665V11.6667L9.18234 10.8333C9.39484 8.03667 11.7323 5.83333 14.5832 5.83333H18.3332ZM4.99984 2.5C7.5765 2.5 9.76317 4.17083 10.5357 6.48833C9.28567 7.55083 8.46067 9.095 8.3465 10.8333H7.49984C4.27817 10.8333 1.6665 8.22167 1.6665 5V2.5H4.99984Z" 
            fill={active ? '#66CC00' : 'var(--grey)'}/>
    </svg>
)

export const 食品安全 = ({ active = false, ...props }) => (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" {...props}>
        <path d="M10 0.833313L16.8475 2.35498C17.2283 2.43998 17.5 2.77748 17.5 3.16831V11.4908C17.5 13.1625 16.6642 14.7241 15.2733 15.6508L10 19.1666L4.72667 15.6508C3.335 14.7233 2.5 13.1625 2.5 11.4916V3.16831C2.5 2.77748 2.77167 2.43998 3.1525 2.35498L10 0.833313ZM13.71 6.85165L9.585 10.9758L7.22833 8.61915L6.05 9.79748L9.58583 13.3333L14.8892 8.02998L13.71 6.85165Z" 
            fill={active ? '#FFD86F' : 'var(--grey)'}/>
    </svg>
);

export const 節能度 = 節能;
export const 舒適度 = 舒適;
export const 省錢度 = 省錢;
export const 社會福利度 = 社福;
export const 社會福利 = 社福;
export const 社福力 = 社福;
export const 放鬆度 = 放鬆;
export const 資源循環 = 多元共融;
export const 市容整潔 = 舒適;
export const 方便度 = 產業創新;
export const 海洋復育 = 新鮮食材;
export const 透明執政 = 社會福利;