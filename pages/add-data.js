import Link from 'next/link';
import React from 'react';
import Layout from '../components/Layout';

function addData() {
  return (
    <Layout title="Add Data">
      <div>
        <form>
          <div>
            <label>Image name</label>
            <input />
          </div>
          <div>
            <label>Category</label>
            <input />
          </div>
          <div>
            <label>Upload image</label>
            <input type="file" />
          </div>
        </form>
      </div>
      <Link href="/">
        <a>Home</a>
      </Link>
    </Layout>
  );
}

export default addData;
