import{p as c,e as o,f as V,a as t,C as y,y as M,F as h,q as m,d as x,t as n,c as u,r as E,v as U,w as G,m as i,i as T,z as $}from"./index-D0_bp8Tr.js";import{r as H,u as J}from"./api-lwb7dLN3.js";const Y={class:"step-card"},O={class:"step-body"},q={style:{display:"flex",gap:"8px","margin-bottom":"12px"}},K=["value"],Q=["value"],W={key:0,class:"loading-dots"},X={key:1,class:"error-msg"},Z={class:"rekap-stats"},tt={class:"stat-card"},et={class:"stat-value"},at={class:"stat-card"},st={class:"stat-value"},lt={class:"stat-card"},nt={class:"stat-value"},ot={class:"stat-card",style:{background:"#D1FAE5"}},it={class:"stat-value",style:{color:"#065F46"}},dt={class:"stat-card",style:{background:"#FEE2E2"}},rt={class:"stat-value",style:{color:"#DC2626"}},ut={class:"stat-card"},pt={class:"stat-value",style:{"font-size":"20px"}},ct={style:{overflow:"auto",flex:"1","border-radius":"10px",border:"1px solid #E2E8F0"}},ht={class:"rekap-table",style:{"min-width":"600px"}},vt={style:{"text-align":"center"}},gt={style:{"font-family":"monospace","font-size":"11px"}},yt={style:{"font-size":"13px"}},mt={style:{"text-align":"center"}},xt={style:{"text-align":"center","font-weight":"600"}},bt={style:{"text-align":"center","font-weight":"600"}},ft={style:{"text-align":"right","font-weight":"600","font-family":"monospace"}},wt=["onClick"],kt={key:1,style:{"font-size":"14px",color:"var(--success)","font-weight":"700"}},_t={key:0,class:"ttd-section"},Bt={class:"ttd-grid"},Dt={class:"form-label"},Lt=["onUpdate:modelValue"],St=["onUpdate:modelValue"],Mt={key:3,style:{"text-align":"center",padding:"30px",color:"var(--text-secondary)"}},Tt={width:"48",height:"48",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor","stroke-width":"1.5",style:{"margin-bottom":"8px"}},Ct={__name:"HalamanRekap",setup($t){const z=G(),{reset:F}=U(),b=new Date,v=c(b.getMonth()+1),g=c(b.getFullYear()),d=c([]),p=c(!1),r=c(""),w=E([{label:"Petugas",nama:"",jabatan:""},{label:"Mengetahui",nama:"",jabatan:""}]),k=["Januari","Februari","Maret","April","Mei","Juni","Juli","Agustus","September","Oktober","November","Desember"],C=u(()=>{const s=b.getFullYear();return[s-2,s-1,s,s+1]}),f=u(()=>d.value.reduce((s,a)=>s+(parseFloat(a.MeterBaru)||0),0).toFixed(1)),A=u(()=>d.value.length===0?"0":(parseFloat(f.value)/d.value.length).toFixed(1)),_=u(()=>d.value.filter(s=>s.StatusBayar==="Lunas").length),B=u(()=>d.value.filter(s=>s.StatusBayar!=="Lunas").length),D=u(()=>d.value.reduce((a,e)=>a+(parseFloat(e.Tagihan)||0),0).toLocaleString("id-ID"));function L(s){return(parseFloat(s)||0).toLocaleString("id-ID")}async function N(s){const a=d.value.findIndex(e=>String(e.ID)===String(s));if(a!==-1)try{const e=await J(s,"Lunas");e.success?d.value[a].StatusBayar="Lunas":r.value=e.error||"Gagal memperbarui status"}catch{r.value="Gagal terhubung ke server"}}async function I(){p.value=!0,r.value="";try{const s=await H(String(v.value),String(g.value));s.success?d.value=s.data||[]:r.value=s.error||"Gagal memuat data"}catch{r.value="Gagal terhubung ke server"}p.value=!1}function j(){const s=d.value.map((l,S)=>{const R=l.StatusBayar==="Lunas"?"Lunas":"Belum";return`<tr>
      <td style="text-align:center;">${S+1}</td>
      <td style="font-family:monospace;">${l.PelangganID}</td>
      <td>${l.Nama}</td>
      <td style="text-align:center;">${l.MeterLalu||"-"}</td>
      <td style="text-align:center;font-weight:600;">${l.MeterBaru}</td>
      <td style="text-align:center;font-weight:600;">${l.Pemakaian||0}</td>
      <td style="text-align:right;font-weight:600;font-family:monospace;">${L(l.Tagihan)}</td>
      <td style="text-align:center;">${R}</td>
    </tr>`}).join(""),a=`
    <html><head>
      <title>Rekap Bulanan - Toya Bening</title>
      <style>
        @page { margin: 8mm; size: A4 landscape; }
        body { font-family: 'Segoe UI', Arial, sans-serif; font-size: 11px; color: #222; margin:0; padding:0; }
        h2 { text-align: center; color: #1A56DB; margin:0 0 4px; font-size:18px; }
        .sub { text-align: center; color: #555; font-size:12px; margin-bottom:4px; }
        .summary { text-align: center; font-size:11px; margin-bottom:10px; color: #333; }
        table { width: 100%; border-collapse: collapse; }
        th {
          background: #1A56DB; color: white; padding: 7px 6px;
          font-size: 11px; text-align: left; font-weight: 600;
          border: 1px solid #1A56DB;
        }
        td {
          padding: 5px 6px; border: 1px solid #CBD5E1;
          font-size: 11px;
        }
        tr:nth-child(even) { background: #F1F5F9; }
        .lunas { font-weight:600; color:#065F46; }
        .belum { font-weight:600; color:#DC2626; }
        .footer {
          text-align: center; margin-top: 16px; padding-top: 10px;
          border-top: 2px solid #1A56DB; font-size: 10px; color: #666;
          display: flex; justify-content: space-between;
        }
        .ttd { margin-top: 20px; display: flex; justify-content: space-between; font-size: 11px; }
        .ttd div { text-align: center; width: 200px; }
        .ttd .line { margin-top: 40px; border-top: 1px solid #000; padding-top: 4px; }
      </style>
    </head><body>
      <h2>TOYA BENING</h2>
      <div class="sub">Pencatatan Meter Air</div>
      <div class="sub" style="font-weight:600;">REKAP BULANAN — ${k[v.value-1].toUpperCase()} ${g.value}</div>
      <div class="summary">
        Catatan: ${d.value.length} |
        Total Pemakaian: ${f.value} m³ |
        Lunas: ${_.value} |
        Belum Lunas: ${B.value} |
        Total Tagihan: Rp ${D.value}
      </div>
      <table>
        <tr>
          <th style="width:32px;text-align:center;">No</th>
          <th style="width:72px;">ID</th>
          <th>Nama</th>
          <th style="width:60px;text-align:center;">Mtr Lalu</th>
          <th style="width:60px;text-align:center;">Mtr Baru</th>
          <th style="width:50px;text-align:center;">Pakai</th>
          <th style="width:80px;text-align:right;">Tagihan</th>
          <th style="width:56px;text-align:center;">Status</th>
        </tr>
        ${s}
      </table>
      <div class="footer">
  <span>Dicetak dari Toya Bening</span>
  <span>
    ${new Date().toLocaleString("id-ID",{day:"numeric",month:"long",year:"numeric",hour:"2-digit",minute:"2-digit"})}
  </span>
</div>

      <div class="ttd">
        ${w.map(l=>`
        <div class="kolom-ttd">
          <div class="jabatan">${l.jabatan||l.label}</div>
          <div class="ruang-ttd"></div>
          <div class="nama"><u>${l.nama||"&nbsp;"}</u></div>
        </div>
        `).join("")}
      </div>
    </body></html>
  `,e=window.open("","_blank","width=900,height=700");e?(e.document.write(a),e.document.close(),e.focus(),setTimeout(()=>{e.print()},600)):r.value="Popup diblokir. Izinkan popup untuk cetak."}function P(){F(),z.push("/scan")}return(s,a)=>(i(),o("div",Y,[a[14]||(a[14]=V('<div class="step-icon"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg></div><h2 class="step-title">Rekap Bulanan</h2><p class="step-desc">Data pencatatan meter per bulan</p>',3)),t("div",O,[t("div",q,[y(t("select",{"onUpdate:modelValue":a[0]||(a[0]=e=>v.value=e),class:"form-input",style:{flex:"1"}},[(i(),o(h,null,m(k,(e,l)=>t("option",{key:l,value:l+1},n(e),9,K)),64))],512),[[M,v.value]]),y(t("select",{"onUpdate:modelValue":a[1]||(a[1]=e=>g.value=e),class:"form-input",style:{width:"100px"}},[(i(!0),o(h,null,m(C.value,e=>(i(),o("option",{key:e,value:e},n(e),9,Q))),128))],512),[[M,g.value]]),t("button",{class:"btn btn-primary",style:{width:"auto",padding:"12px 16px"},onClick:I},[...a[2]||(a[2]=[t("svg",{width:"18",height:"18",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor","stroke-width":"2"},[t("polyline",{points:"23 4 23 10 17 10"}),t("path",{d:"M20.49 15a9 9 0 1 1-2.12-9.36L23 10"})],-1)])])]),p.value?(i(),o("div",W,[...a[3]||(a[3]=[t("span",null,null,-1),t("span",null,null,-1),t("span",null,null,-1)])])):x("",!0),r.value?(i(),o("div",X,n(r.value),1)):x("",!0),!p.value&&d.value.length>0?(i(),o(h,{key:2},[t("div",Z,[t("div",tt,[t("div",et,n(d.value.length),1),a[4]||(a[4]=t("div",{class:"stat-label"},"Total Catatan",-1))]),t("div",at,[t("div",st,n(f.value),1),a[5]||(a[5]=t("div",{class:"stat-label"},"Total m³",-1))]),t("div",lt,[t("div",nt,n(A.value),1),a[6]||(a[6]=t("div",{class:"stat-label"},"Rata-rata m³",-1))]),t("div",ot,[t("div",it,n(_.value),1),a[7]||(a[7]=t("div",{class:"stat-label"},"Lunas",-1))]),t("div",dt,[t("div",rt,n(B.value),1),a[8]||(a[8]=t("div",{class:"stat-label"},"Belum Lunas",-1))]),t("div",ut,[t("div",pt,"Rp "+n(D.value),1),a[9]||(a[9]=t("div",{class:"stat-label"},"Total Tagihan",-1))])]),t("div",ct,[t("table",ht,[a[10]||(a[10]=t("thead",null,[t("tr",null,[t("th",{style:{width:"36px"}},"No"),t("th",{style:{width:"70px"}},"ID"),t("th",null,"Nama"),t("th",{style:{width:"70px"}},"Mtr Lalu"),t("th",{style:{width:"70px"}},"Mtr Baru"),t("th",{style:{width:"60px"}},"Pakai"),t("th",{style:{width:"80px"}},"Tagihan"),t("th",{style:{width:"70px"}},"Status"),t("th",{style:{width:"56px"}},"Aksi")])],-1)),t("tbody",null,[(i(!0),o(h,null,m(d.value,(e,l)=>(i(),o("tr",{key:e.ID,class:T({"row-lunas":e.StatusBayar==="Lunas"})},[t("td",vt,n(l+1),1),t("td",gt,n(e.PelangganID),1),t("td",yt,n(e.Nama),1),t("td",mt,n(e.MeterLalu||"-"),1),t("td",xt,n(e.MeterBaru),1),t("td",bt,n(e.Pemakaian||0),1),t("td",ft,n(L(e.Tagihan)),1),t("td",null,[t("span",{class:T(["badge",e.StatusBayar==="Lunas"?"badge-success":"badge-warning"]),style:{"font-size":"10px"}},n(e.StatusBayar||"Blm Lunas"),3)]),t("td",null,[e.StatusBayar!=="Lunas"?(i(),o("button",{key:0,class:"btn btn-success",style:{padding:"3px 8px","font-size":"10px",width:"auto","min-width":"0"},onClick:S=>N(e.ID)}," Bayar ",8,wt)):(i(),o("span",kt,"✓"))])],2))),128))])])]),d.value.length>0?(i(),o("div",_t,[a[11]||(a[11]=t("p",{class:"ttd-section-title"},"Tanda Tangan Cetak",-1)),t("div",Bt,[(i(!0),o(h,null,m(w,e=>(i(),o("div",{key:e.label},[t("label",Dt,n(e.label),1),y(t("input",{"onUpdate:modelValue":l=>e.nama=l,class:"form-input ttd-input",placeholder:"Nama"},null,8,Lt),[[$,e.nama]]),y(t("input",{"onUpdate:modelValue":l=>e.jabatan=l,class:"form-input",placeholder:"Jabatan"},null,8,St),[[$,e.jabatan]])]))),128))])])):x("",!0)],64)):!p.value&&!r.value?(i(),o("div",Mt,[(i(),o("svg",Tt,[...a[12]||(a[12]=[t("path",{d:"M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"},null,-1),t("polyline",{points:"14 2 14 8 20 8"},null,-1)])])),a[13]||(a[13]=t("p",null,"Pilih bulan dan tahun, lalu klik tombol refresh",-1))])):x("",!0)]),t("div",{class:"btn-group"},[t("button",{class:"btn btn-outline",onClick:j},"Cetak Rekap"),t("button",{class:"btn btn-primary",onClick:P},"Scan Baru")])]))}};export{Ct as default};
