import{r as u,e as o,f as J,a as t,B as p,x as F,F as m,p as D,d as y,t as l,y as x,c,s as G,v as H,m as i,i as N}from"./index-BxlWFKlM.js";import{r as Y,u as O}from"./api-zTt_7xYy.js";const K={class:"step-card"},q={class:"step-body"},Q={style:{display:"flex",gap:"8px","margin-bottom":"12px"}},W=["value"],X=["value"],Z={key:0,class:"loading-dots"},tt={key:1,class:"error-msg"},et={class:"rekap-stats"},at={class:"stat-card"},st={class:"stat-value"},lt={class:"stat-card"},nt={class:"stat-value"},ot={class:"stat-card"},it={class:"stat-value"},rt={class:"stat-card",style:{background:"#D1FAE5"}},dt={class:"stat-value",style:{color:"#065F46"}},ut={class:"stat-card",style:{background:"#FEE2E2"}},pt={class:"stat-value",style:{color:"#DC2626"}},ct={class:"stat-card"},vt={class:"stat-value",style:{"font-size":"20px"}},gt={style:{overflow:"auto",flex:"1","border-radius":"10px",border:"1px solid #E2E8F0"}},ht={class:"rekap-table",style:{"min-width":"600px"}},mt={style:{"text-align":"center"}},yt={style:{"font-family":"monospace","font-size":"11px"}},xt={style:{"font-size":"13px"}},ft={style:{"text-align":"center"}},bt={style:{"text-align":"center","font-weight":"600"}},wt={style:{"text-align":"center","font-weight":"600"}},kt={style:{"text-align":"right","font-weight":"600","font-family":"monospace"}},Bt=["onClick"],_t={key:1,style:{"font-size":"14px",color:"var(--success)","font-weight":"700"}},Dt={key:0,style:{"margin-top":"12px",padding:"12px",background:"var(--primary-bg)","border-radius":"10px"}},Lt={style:{display:"grid","grid-template-columns":"1fr 1fr",gap:"10px"}},St={key:3,style:{"text-align":"center",padding:"30px",color:"var(--text-secondary)"}},zt={width:"48",height:"48",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor","stroke-width":"1.5",style:{"margin-bottom":"8px"}},Ft={__name:"HalamanRekap",setup(Mt){const C=H(),{reset:A}=G(),f=new Date,g=u(f.getMonth()+1),h=u(f.getFullYear()),n=u([]),v=u(!1),d=u(""),b=u(""),w=u(""),k=u(""),B=u(""),L=["Januari","Februari","Maret","April","Mei","Juni","Juli","Agustus","September","Oktober","November","Desember"],P=c(()=>{const s=f.getFullYear();return[s-2,s-1,s,s+1]}),_=c(()=>n.value.reduce((s,e)=>s+(parseFloat(e.MeterBaru)||0),0).toFixed(1)),I=c(()=>n.value.length===0?"0":(parseFloat(_.value)/n.value.length).toFixed(1)),S=c(()=>n.value.filter(s=>s.StatusBayar==="Lunas").length),z=c(()=>n.value.filter(s=>s.StatusBayar!=="Lunas").length),M=c(()=>n.value.reduce((e,a)=>e+(parseFloat(a.Tagihan)||0),0).toLocaleString("id-ID"));function $(s){return(parseFloat(s)||0).toLocaleString("id-ID")}async function R(s){const e=n.value.findIndex(a=>String(a.ID)===String(s));if(e!==-1)try{const a=await O(s,"Lunas");a.success?n.value[e].StatusBayar="Lunas":d.value=a.error||"Gagal memperbarui status"}catch{d.value="Gagal terhubung ke server"}}async function V(){v.value=!0,d.value="";try{const s=await Y(String(g.value),String(h.value));s.success?n.value=s.data||[]:d.value=s.error||"Gagal memuat data"}catch{d.value="Gagal terhubung ke server"}v.value=!1}function E(){const s=n.value.map((r,T)=>{const j=r.StatusBayar==="Lunas"?"Lunas":"Belum";return`<tr>
      <td style="text-align:center;">${T+1}</td>
      <td style="font-family:monospace;">${r.PelangganID}</td>
      <td>${r.Nama}</td>
      <td style="text-align:center;">${r.MeterLalu||"-"}</td>
      <td style="text-align:center;font-weight:600;">${r.MeterBaru}</td>
      <td style="text-align:center;font-weight:600;">${r.Pemakaian||0}</td>
      <td style="text-align:right;font-weight:600;font-family:monospace;">${$(r.Tagihan)}</td>
      <td style="text-align:center;">${j}</td>
    </tr>`}).join(""),e=`
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
      <div class="sub" style="font-weight:600;">REKAP BULANAN — ${L[g.value-1].toUpperCase()} ${h.value}</div>
      <div class="summary">
        Catatan: ${n.value.length} |
        Total Pemakaian: ${_.value} m³ |
        Lunas: ${S.value} |
        Belum Lunas: ${z.value} |
        Total Tagihan: Rp ${M.value}
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
        <div class="kolom-ttd">
          <div class="jabatan">
            ${w.value||"Petugas"}
          </div>

          <div class="ruang-ttd"></div>

          <div class="nama">
            <u>${b.value||"&nbsp;"}</u>
          </div>
        </div>

        <div class="kolom-ttd">
          <div class="jabatan">
            ${B.value||"Mengetahui"}
          </div>

          <div class="ruang-ttd"></div>

          <div class="nama">
            <u>${k.value||"&nbsp;"}</u>
          </div>
        </div>
      </div>
    </body></html>
  `,a=window.open("","_blank","width=900,height=700");a?(a.document.write(e),a.document.close(),a.focus(),setTimeout(()=>{a.print()},600)):d.value="Popup diblokir. Izinkan popup untuk cetak."}function U(){A(),C.push("/scan")}return(s,e)=>(i(),o("div",K,[e[20]||(e[20]=J('<div class="step-icon"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg></div><h2 class="step-title">Rekap Bulanan</h2><p class="step-desc">Data pencatatan meter per bulan</p>',3)),t("div",q,[t("div",Q,[p(t("select",{"onUpdate:modelValue":e[0]||(e[0]=a=>g.value=a),class:"form-input",style:{flex:"1"}},[(i(),o(m,null,D(L,(a,r)=>t("option",{key:r,value:r+1},l(a),9,W)),64))],512),[[F,g.value]]),p(t("select",{"onUpdate:modelValue":e[1]||(e[1]=a=>h.value=a),class:"form-input",style:{width:"100px"}},[(i(!0),o(m,null,D(P.value,a=>(i(),o("option",{key:a,value:a},l(a),9,X))),128))],512),[[F,h.value]]),t("button",{class:"btn btn-primary",style:{width:"auto",padding:"12px 16px"},onClick:V},[...e[6]||(e[6]=[t("svg",{width:"18",height:"18",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor","stroke-width":"2"},[t("polyline",{points:"23 4 23 10 17 10"}),t("path",{d:"M20.49 15a9 9 0 1 1-2.12-9.36L23 10"})],-1)])])]),v.value?(i(),o("div",Z,[...e[7]||(e[7]=[t("span",null,null,-1),t("span",null,null,-1),t("span",null,null,-1)])])):y("",!0),d.value?(i(),o("div",tt,l(d.value),1)):y("",!0),!v.value&&n.value.length>0?(i(),o(m,{key:2},[t("div",et,[t("div",at,[t("div",st,l(n.value.length),1),e[8]||(e[8]=t("div",{class:"stat-label"},"Total Catatan",-1))]),t("div",lt,[t("div",nt,l(_.value),1),e[9]||(e[9]=t("div",{class:"stat-label"},"Total m³",-1))]),t("div",ot,[t("div",it,l(I.value),1),e[10]||(e[10]=t("div",{class:"stat-label"},"Rata-rata m³",-1))]),t("div",rt,[t("div",dt,l(S.value),1),e[11]||(e[11]=t("div",{class:"stat-label"},"Lunas",-1))]),t("div",ut,[t("div",pt,l(z.value),1),e[12]||(e[12]=t("div",{class:"stat-label"},"Belum Lunas",-1))]),t("div",ct,[t("div",vt,"Rp "+l(M.value),1),e[13]||(e[13]=t("div",{class:"stat-label"},"Total Tagihan",-1))])]),t("div",gt,[t("table",ht,[e[14]||(e[14]=t("thead",null,[t("tr",null,[t("th",{style:{width:"36px"}},"No"),t("th",{style:{width:"70px"}},"ID"),t("th",null,"Nama"),t("th",{style:{width:"70px"}},"Mtr Lalu"),t("th",{style:{width:"70px"}},"Mtr Baru"),t("th",{style:{width:"60px"}},"Pakai"),t("th",{style:{width:"80px"}},"Tagihan"),t("th",{style:{width:"70px"}},"Status"),t("th",{style:{width:"56px"}},"Aksi")])],-1)),t("tbody",null,[(i(!0),o(m,null,D(n.value,(a,r)=>(i(),o("tr",{key:a.ID,class:N({"row-lunas":a.StatusBayar==="Lunas"})},[t("td",mt,l(r+1),1),t("td",yt,l(a.PelangganID),1),t("td",xt,l(a.Nama),1),t("td",ft,l(a.MeterLalu||"-"),1),t("td",bt,l(a.MeterBaru),1),t("td",wt,l(a.Pemakaian||0),1),t("td",kt,l($(a.Tagihan)),1),t("td",null,[t("span",{class:N(["badge",a.StatusBayar==="Lunas"?"badge-success":"badge-warning"]),style:{"font-size":"10px"}},l(a.StatusBayar||"Blm Lunas"),3)]),t("td",null,[a.StatusBayar!=="Lunas"?(i(),o("button",{key:0,class:"btn btn-success",style:{padding:"3px 8px","font-size":"10px",width:"auto","min-width":"0"},onClick:T=>R(a.ID)}," Bayar ",8,Bt)):(i(),o("span",_t,"✓"))])],2))),128))])])]),n.value.length>0?(i(),o("div",Dt,[e[17]||(e[17]=t("p",{style:{"font-size":"12px","font-weight":"600",color:"var(--text-secondary)","margin-bottom":"8px"}},"Tanda Tangan Cetak",-1)),t("div",Lt,[t("div",null,[e[15]||(e[15]=t("label",{class:"form-label"},"Petugas",-1)),p(t("input",{"onUpdate:modelValue":e[2]||(e[2]=a=>b.value=a),class:"form-input",placeholder:"Nama",style:{"margin-bottom":"4px","font-size":"13px"}},null,512),[[x,b.value]]),p(t("input",{"onUpdate:modelValue":e[3]||(e[3]=a=>w.value=a),class:"form-input",placeholder:"Jabatan",style:{"font-size":"13px"}},null,512),[[x,w.value]])]),t("div",null,[e[16]||(e[16]=t("label",{class:"form-label"},"Mengetahui",-1)),p(t("input",{"onUpdate:modelValue":e[4]||(e[4]=a=>k.value=a),class:"form-input",placeholder:"Nama",style:{"margin-bottom":"4px","font-size":"13px"}},null,512),[[x,k.value]]),p(t("input",{"onUpdate:modelValue":e[5]||(e[5]=a=>B.value=a),class:"form-input",placeholder:"Jabatan",style:{"font-size":"13px"}},null,512),[[x,B.value]])])])])):y("",!0)],64)):!v.value&&!d.value?(i(),o("div",St,[(i(),o("svg",zt,[...e[18]||(e[18]=[t("path",{d:"M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"},null,-1),t("polyline",{points:"14 2 14 8 20 8"},null,-1)])])),e[19]||(e[19]=t("p",null,"Pilih bulan dan tahun, lalu klik tombol refresh",-1))])):y("",!0)]),t("div",{class:"btn-group"},[t("button",{class:"btn btn-outline",onClick:E},"Cetak Rekap"),t("button",{class:"btn btn-primary",onClick:U},"Scan Baru")])]))}};export{Ft as default};
