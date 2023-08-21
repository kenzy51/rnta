import { Tabs } from 'antd';
import { items } from './tabItems';
import cls from './Summary.module.scss'
export const SummaryPage = () => {
    return (<div className={cls.wrapper}>
        <Tabs items={items} tabBarStyle={{borderBottomColor:'red'}} size='small'/>
    </div>
    );
};
