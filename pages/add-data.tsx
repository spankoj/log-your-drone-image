import React from 'react';
import AddInput from '../components/AddInput';
import Layout from '../components/Layout';
import { UiFileInputButton } from '../components/UiFileInputButton';
import { uploadFileRequest } from '../domain/upload/upload.services';
import styles from '../styles/AddData.module.css';

interface IProps {}

function addData(props) {
  const onChange = async (formData: FormData) => {
    const response = await uploadFileRequest(formData, (event) => {
      console.log(
        `Current progress:`,
        Math.round((event.loaded * 100) / event.total),
      );
    });

    console.log('response', response);
  };
  return (
    <Layout title="Add Data">
      <main>
        <div className={styles.control}>
          <label htmlFor="name">Upload:</label>
          {/* Code snippet to file uploud */}
          <UiFileInputButton
            label="Drone Image"
            uploadFileName="theFiles"
            onChange={onChange}
          />
        </div>
        <AddInput />
      </main>
    </Layout>
  );
}

export default addData;
// export const addData: React.FC<IProps> = (props) => {
//   const onChange = async (formData: FormData) => {
//     const response = await uploadFileRequest(formData, (event) => {
//       console.log(
//         `Current progress:`,
//         Math.round((event.loaded * 100) / event.total),
//       );
//     });

//     console.log('response', response);
//   };
//   return (
//     <Layout title="Add Data">
//       <div>
//         <form className={styles.form}>
//           <div className={styles.control}>
//             {/* Code snippet to file uploud */}
//             <UiFileInputButton
//               label="Upload Single File"
//               uploadFileName="theFiles"
//               onChange={onChange}
//             />
//             {/* <div>
//               <label className={styles.label} htmlFor="upload">
//                 Upload image
//               </label>
//               <input
//                 className={styles.input}
//                 type="file"
//                 id="upload"
//                 name="upload"
//                 accept="image/*"
//               />
//             </div> */}
//             <label className={styles.label} htmlFor="name">
//               Descriptive Name
//             </label>
//             <input
//               className={styles.input}
//               type="text"
//               name="name"
//               placeholder="best-drone-image-ever"
//             />
//           </div>
//           <div className={styles.control}>
//             <label className={styles.label} htmlFor="category">
//               Category
//             </label>
//             <select className={styles.input} name="category" id="category">
//               <option value="building">Building</option>
//               <option value="monument">Monument</option>
//               <option value="landscape">Landscape</option>
//             </select>
//           </div>

//           <input className="btn" type="submit" />
//         </form>
//       </div>
//       {/* <Link href="/">
//         <a className="btn-secondary">Home</a>
//       </Link> */}
//     </Layout>
//   );
// };
