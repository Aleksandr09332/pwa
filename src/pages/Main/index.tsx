import { Alert } from 'antd';
import { useTranslation } from 'react-i18next';
import { getAlbums } from '../../store/api/jsonPlaceholderApi/api';
import AlbumItem from './components/AlbumItem';
import Layout from '../../components/Layout';
import './index.css';

function Main() {
  const { t } = useTranslation<string>();
  const { isLoading, data, error } = getAlbums();
  let content = null;

  if (error) {
    content = <Alert message={error.toString()} type="error" />;
  } else if (isLoading) {
    content = t('global.loading');
  } else if (data?.length) {
    content = data.map((item) => <AlbumItem key={item.id} data={item} />);
  }

  return <Layout title="Progressive Web Applications">{content}</Layout>;
}

export default Main;
