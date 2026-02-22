import React, { useState } from 'react';
import { Users, UserPlus, Calendar, ArrowRightLeft, FileText, LogOut, Shield, Briefcase, Camera, Search, Plus, Edit, Trash2, Eye } from 'lucide-react';

const SistemaPrisional = () => {
  const [currentPage, setCurrentPage] = useState('login');
  const [userProfile, setUserProfile] = useState<string | null>(null);
  const [detentos, setDetentos] = useState([
    { id: 1, nome: 'João Silva', idade: 35, mae: 'Maria Silva', pai: 'José Silva', estadoCivil: 'Solteiro', foto: 'JS', cela: 'A-101', pavilhao: 'A' },
    { id: 2, nome: 'Carlos Santos', idade: 28, mae: 'Ana Santos', pai: 'Pedro Santos', estadoCivil: 'Casado', foto: 'CS', cela: 'B-205', pavilhao: 'B' }
  ]);
  const [visitantes, setVisitantes] = useState([
    { id: 1, nome: 'Maria Oliveira', cpf: '123.456.789-00', detento: 'João Silva', parentesco: 'Esposa' },
    { id: 2, nome: 'Paulo Santos', cpf: '987.654.321-00', detento: 'Carlos Santos', parentesco: 'Irmão' }
  ]);
  const [movimentacoes, setMovimentacoes] = useState<any[]>([]);
  const [agendamentos, setAgendamentos] = useState<any[]>([]);
  const [visitasAdvogado, setVisitasAdvogado] = useState<any[]>([]);
  const [formData, setFormData] = useState<any>({});
  const [loginUser, setLoginUser] = useState('');
  const [loginPass, setLoginPass] = useState('');
  const [loginError, setLoginError] = useState('');

  const handleLogin = () => {
    if (loginUser === '123' && loginPass === '123') {
      setUserProfile('administrador');
      setCurrentPage('dashboard');
      setLoginError('');
    } else {
      setLoginError('Usuário ou senha incorretos');
    }
  };

  const handleLogout = () => {
    setUserProfile(null);
    setCurrentPage('login');
    setFormData({});
    setLoginUser('');
    setLoginPass('');
  };

  const LoginPage = () => (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden">
        <div className="bg-gradient-to-r from-blue-600 to-blue-800 p-8 text-white">
          <Shield className="w-16 h-16 mx-auto mb-4" />
          <h1 className="text-3xl font-bold text-center">Sistema Prisional</h1>
          <p className="text-center text-blue-100 mt-2">Gestão e Controle</p>
        </div>
        
        <div className="p-8">
          <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded-lg text-sm text-blue-800">
            <strong>Demo:</strong> Use Login <code className="bg-blue-100 px-1 rounded">123</code> e Senha <code className="bg-blue-100 px-1 rounded">123</code>
          </div>

          {loginError && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-700">
              {loginError}
            </div>
          )}

          <div className="mb-6">
            <label className="block text-gray-700 font-semibold mb-2">Usuário</label>
            <input 
              type="text" 
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-gray-800"
              placeholder="Digite seu usuário"
              value={loginUser}
              onChange={(e) => setLoginUser(e.target.value)}
            />
          </div>
          
          <div className="mb-6">
            <label className="block text-gray-700 font-semibold mb-2">Senha</label>
            <input 
              type="password" 
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-gray-800"
              placeholder="Digite sua senha"
              value={loginPass}
              onChange={(e) => setLoginPass(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleLogin()}
            />
          </div>

          <button 
            onClick={handleLogin}
            className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-3 rounded-lg font-semibold hover:from-blue-700 hover:to-blue-800 transition-all shadow-lg"
          >
            Entrar
          </button>
        </div>
      </div>
    </div>
  );

  const Dashboard = () => (
    <div className="p-6">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">Dashboard</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl p-6 text-white shadow-lg">
          <Users className="w-12 h-12 mb-3 opacity-90" />
          <h3 className="text-2xl font-bold">{detentos.length}</h3>
          <p className="text-blue-100">Detentos</p>
        </div>
        <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-xl p-6 text-white shadow-lg">
          <UserPlus className="w-12 h-12 mb-3 opacity-90" />
          <h3 className="text-2xl font-bold">{visitantes.length}</h3>
          <p className="text-green-100">Visitantes</p>
        </div>
        <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl p-6 text-white shadow-lg">
          <Calendar className="w-12 h-12 mb-3 opacity-90" />
          <h3 className="text-2xl font-bold">{agendamentos.length}</h3>
          <p className="text-purple-100">Agendamentos</p>
        </div>
        <div className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl p-6 text-white shadow-lg">
          <ArrowRightLeft className="w-12 h-12 mb-3 opacity-90" />
          <h3 className="text-2xl font-bold">{movimentacoes.length}</h3>
          <p className="text-orange-100">Movimentações</p>
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-xl font-bold text-gray-800 mb-4">Últimos Detentos Cadastrados</h3>
          <div className="space-y-3">
            {detentos.slice(0, 3).map(det => (
              <div key={det.id} className="flex items-center p-3 bg-gray-50 rounded-lg">
                <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold mr-3">{det.foto}</div>
                <div>
                  <p className="font-semibold text-gray-800">{det.nome}</p>
                  <p className="text-sm text-gray-600">Cela: {det.cela} - Pavilhão {det.pavilhao}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-xl font-bold text-gray-800 mb-4">Atividades Recentes</h3>
          <div className="space-y-3">
            <div className="flex items-center p-3 bg-blue-50 rounded-lg">
              <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
              <p className="text-sm text-gray-700">Novo visitante cadastrado</p>
            </div>
            <div className="flex items-center p-3 bg-green-50 rounded-lg">
              <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
              <p className="text-sm text-gray-700">Agendamento de visita aprovado</p>
            </div>
            <div className="flex items-center p-3 bg-orange-50 rounded-lg">
              <div className="w-2 h-2 bg-orange-500 rounded-full mr-3"></div>
              <p className="text-sm text-gray-700">Movimentação interna registrada</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const CadastroDetento = () => {
    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      const iniciais = formData.nome ? formData.nome.split(' ').map((n: string) => n[0]).join('').toUpperCase() : 'XX';
      setDetentos([...detentos, { ...formData, id: Date.now(), foto: iniciais }]);
      setFormData({});
    };
    return (
      <div className="p-6">
        <h2 className="text-3xl font-bold text-gray-800 mb-6">Cadastro de Detentos</h2>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1 bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-xl font-bold text-gray-800 mb-4">Novo Detento</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              {[
                { label: 'Nome Completo', key: 'nome', placeholder: 'Digite o nome' },
                { label: 'Idade', key: 'idade', placeholder: 'Idade', type: 'number' },
                { label: 'Nome da Mãe', key: 'mae', placeholder: 'Nome da mãe' },
                { label: 'Nome do Pai', key: 'pai', placeholder: 'Nome do pai', required: false },
                { label: 'Cela', key: 'cela', placeholder: 'Ex: A-101' },
                { label: 'Pavilhão', key: 'pavilhao', placeholder: 'Ex: A' },
              ].map(field => (
                <div key={field.key}>
                  <label className="block text-gray-700 font-semibold mb-2">{field.label}</label>
                  <input
                    type={field.type || 'text'}
                    required={field.required !== false}
                    value={formData[field.key] || ''}
                    onChange={(e) => setFormData({ ...formData, [field.key]: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-gray-800"
                    placeholder={field.placeholder}
                  />
                </div>
              ))}
              <div>
                <label className="block text-gray-700 font-semibold mb-2">Estado Civil</label>
                <select
                  required
                  value={formData.estadoCivil || ''}
                  onChange={(e) => setFormData({ ...formData, estadoCivil: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-gray-800"
                >
                  <option value="">Selecione</option>
                  <option value="Solteiro">Solteiro</option>
                  <option value="Casado">Casado</option>
                  <option value="Divorciado">Divorciado</option>
                  <option value="Viúvo">Viúvo</option>
                </select>
              </div>
              <button type="submit" className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors">
                Cadastrar Detento
              </button>
            </form>
          </div>
          <div className="lg:col-span-2 bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-xl font-bold text-gray-800 mb-4">Detentos Cadastrados</h3>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    {['Nome', 'Idade', 'Cela', 'Pavilhão', 'Ações'].map(h => (
                      <th key={h} className="px-4 py-3 text-left text-sm font-semibold text-gray-700">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {detentos.map(detento => (
                    <tr key={detento.id} className="hover:bg-gray-50">
                      <td className="px-4 py-3 text-sm text-gray-800">{detento.nome}</td>
                      <td className="px-4 py-3 text-sm text-gray-600">{detento.idade}</td>
                      <td className="px-4 py-3 text-sm text-gray-600">{detento.cela}</td>
                      <td className="px-4 py-3 text-sm text-gray-600">{detento.pavilhao}</td>
                      <td className="px-4 py-3">
                        <div className="flex gap-2">
                          <button className="p-1 text-blue-600 hover:bg-blue-50 rounded"><Edit className="w-4 h-4" /></button>
                          <button className="p-1 text-green-600 hover:bg-green-50 rounded"><Eye className="w-4 h-4" /></button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const CadastroVisitante = () => {
    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      setVisitantes([...visitantes, { ...formData, id: Date.now() }]);
      setFormData({});
    };
    return (
      <div className="p-6">
        <h2 className="text-3xl font-bold text-gray-800 mb-6">Cadastro de Visitantes</h2>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1 bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-xl font-bold text-gray-800 mb-4">Novo Visitante</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-gray-700 font-semibold mb-2">Nome Completo</label>
                <input type="text" required value={formData.nome || ''} onChange={(e) => setFormData({ ...formData, nome: e.target.value })} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-gray-800" />
              </div>
              <div>
                <label className="block text-gray-700 font-semibold mb-2">CPF</label>
                <input type="text" required value={formData.cpf || ''} onChange={(e) => setFormData({ ...formData, cpf: e.target.value })} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-gray-800" placeholder="000.000.000-00" />
              </div>
              <div>
                <label className="block text-gray-700 font-semibold mb-2">Detento Vinculado</label>
                <select required value={formData.detento || ''} onChange={(e) => setFormData({ ...formData, detento: e.target.value })} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-gray-800">
                  <option value="">Selecione</option>
                  {detentos.map(d => <option key={d.id} value={d.nome}>{d.nome}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-gray-700 font-semibold mb-2">Parentesco</label>
                <select required value={formData.parentesco || ''} onChange={(e) => setFormData({ ...formData, parentesco: e.target.value })} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-gray-800">
                  <option value="">Selecione</option>
                  <option value="Pai/Mãe">Pai ou Mãe</option>
                  <option value="Filho(a)">Filho ou Filha</option>
                  <option value="Cônjuge">Cônjuge</option>
                  <option value="Irmão(ã)">Irmão ou Irmã</option>
                  <option value="Outro">Outro</option>
                </select>
              </div>
              <button type="submit" className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors">Cadastrar Visitante</button>
            </form>
          </div>
          <div className="lg:col-span-2 bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-xl font-bold text-gray-800 mb-4">Visitantes Cadastrados</h3>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    {['Nome', 'CPF', 'Detento', 'Parentesco'].map(h => (
                      <th key={h} className="px-4 py-3 text-left text-sm font-semibold text-gray-700">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {visitantes.map(v => (
                    <tr key={v.id} className="hover:bg-gray-50">
                      <td className="px-4 py-3 text-sm text-gray-800">{v.nome}</td>
                      <td className="px-4 py-3 text-sm text-gray-600">{v.cpf}</td>
                      <td className="px-4 py-3 text-sm text-gray-600">{v.detento}</td>
                      <td className="px-4 py-3 text-sm text-gray-600">{v.parentesco}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const MovimentacaoInterna = () => {
    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      setMovimentacoes([...movimentacoes, { ...formData, id: Date.now(), data: new Date().toLocaleDateString() }]);
      setFormData({});
    };
    return (
      <div className="p-6">
        <h2 className="text-3xl font-bold text-gray-800 mb-6">Movimentação Interna</h2>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1 bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-xl font-bold text-gray-800 mb-4">Registrar Movimentação</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-gray-700 font-semibold mb-2">Detento</label>
                <select required value={formData.detento || ''} onChange={(e) => setFormData({ ...formData, detento: e.target.value })} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-gray-800">
                  <option value="">Selecione</option>
                  {detentos.map(d => <option key={d.id} value={d.nome}>{d.nome} - {d.cela}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-gray-700 font-semibold mb-2">Tipo de Movimentação</label>
                <select required value={formData.tipo || ''} onChange={(e) => setFormData({ ...formData, tipo: e.target.value })} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-gray-800">
                  <option value="">Selecione</option>
                  <option value="Transferência de Cela">Transferência de Cela</option>
                  <option value="Mudança de Pavilhão">Mudança de Pavilhão</option>
                  <option value="Isolamento">Isolamento</option>
                  <option value="Retorno ao Convívio">Retorno ao Convívio</option>
                </select>
              </div>
              <div>
                <label className="block text-gray-700 font-semibold mb-2">Destino</label>
                <input type="text" required value={formData.destino || ''} onChange={(e) => setFormData({ ...formData, destino: e.target.value })} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-gray-800" placeholder="Nova cela ou pavilhão" />
              </div>
              <div>
                <label className="block text-gray-700 font-semibold mb-2">Motivo</label>
                <textarea required value={formData.motivo || ''} onChange={(e) => setFormData({ ...formData, motivo: e.target.value })} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-gray-800" rows={3} placeholder="Descreva o motivo" />
              </div>
              <button type="submit" className="w-full bg-orange-600 text-white py-3 rounded-lg font-semibold hover:bg-orange-700 transition-colors">Registrar Movimentação</button>
            </form>
          </div>
          <div className="lg:col-span-2 bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-xl font-bold text-gray-800 mb-4">Histórico de Movimentações</h3>
            <div className="space-y-3">
              {movimentacoes.length === 0 ? (
                <p className="text-gray-500 text-center py-8">Nenhuma movimentação registrada</p>
              ) : (
                movimentacoes.map((mov: any) => (
                  <div key={mov.id} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-semibold text-gray-800">{mov.detento}</h4>
                      <span className="text-sm text-gray-500">{mov.data}</span>
                    </div>
                    <p className="text-sm text-gray-600 mb-1"><strong>Tipo:</strong> {mov.tipo}</p>
                    <p className="text-sm text-gray-600 mb-1"><strong>Destino:</strong> {mov.destino}</p>
                    <p className="text-sm text-gray-600"><strong>Motivo:</strong> {mov.motivo}</p>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    );
  };

  const VisitasAdvogadoPage = () => {
    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      setVisitasAdvogado([...visitasAdvogado, { ...formData, id: Date.now(), data: new Date().toLocaleDateString(), hora: new Date().toLocaleTimeString() }]);
      setFormData({});
    };
    return (
      <div className="p-6">
        <h2 className="text-3xl font-bold text-gray-800 mb-6">Visitas de Advogado</h2>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1 bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-xl font-bold text-gray-800 mb-4">Registrar Visita</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-gray-700 font-semibold mb-2">Nome do Advogado</label>
                <input type="text" required value={formData.advogado || ''} onChange={(e) => setFormData({ ...formData, advogado: e.target.value })} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-gray-800" placeholder="Nome completo" />
              </div>
              <div>
                <label className="block text-gray-700 font-semibold mb-2">OAB</label>
                <input type="text" required value={formData.oab || ''} onChange={(e) => setFormData({ ...formData, oab: e.target.value })} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-gray-800" placeholder="Número da OAB" />
              </div>
              <div>
                <label className="block text-gray-700 font-semibold mb-2">Detento</label>
                <select required value={formData.detento || ''} onChange={(e) => setFormData({ ...formData, detento: e.target.value })} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-gray-800">
                  <option value="">Selecione</option>
                  {detentos.map(d => <option key={d.id} value={d.nome}>{d.nome}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-gray-700 font-semibold mb-2">Observações</label>
                <textarea value={formData.observacoes || ''} onChange={(e) => setFormData({ ...formData, observacoes: e.target.value })} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-gray-800" rows={3} placeholder="Observações sobre a visita" />
              </div>
              <button type="submit" className="w-full bg-purple-600 text-white py-3 rounded-lg font-semibold hover:bg-purple-700 transition-colors">Registrar Visita</button>
            </form>
          </div>
          <div className="lg:col-span-2 bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-xl font-bold text-gray-800 mb-4">Registro de Visitas</h3>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    {['Data', 'Hora', 'Advogado', 'OAB', 'Detento'].map(h => (
                      <th key={h} className="px-4 py-3 text-left text-sm font-semibold text-gray-700">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {visitasAdvogado.length === 0 ? (
                    <tr><td colSpan={5} className="px-4 py-8 text-center text-gray-500">Nenhuma visita registrada</td></tr>
                  ) : (
                    visitasAdvogado.map((visita: any) => (
                      <tr key={visita.id} className="hover:bg-gray-50">
                        <td className="px-4 py-3 text-sm text-gray-800">{visita.data}</td>
                        <td className="px-4 py-3 text-sm text-gray-600">{visita.hora}</td>
                        <td className="px-4 py-3 text-sm text-gray-800">{visita.advogado}</td>
                        <td className="px-4 py-3 text-sm text-gray-600">{visita.oab}</td>
                        <td className="px-4 py-3 text-sm text-gray-600">{visita.detento}</td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const Agendamento = () => {
    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      setAgendamentos([...agendamentos, { ...formData, id: Date.now(), status: 'Pendente' }]);
      setFormData({});
    };
    return (
      <div className="p-6">
        <h2 className="text-3xl font-bold text-gray-800 mb-6">Agendamento de Visitas</h2>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1 bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-xl font-bold text-gray-800 mb-4">Novo Agendamento</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-gray-700 font-semibold mb-2">Visitante</label>
                <select required value={formData.visitante || ''} onChange={(e) => setFormData({ ...formData, visitante: e.target.value })} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-gray-800">
                  <option value="">Selecione</option>
                  {visitantes.map(v => <option key={v.id} value={v.nome}>{v.nome}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-gray-700 font-semibold mb-2">Data</label>
                <input type="date" required value={formData.dataVisita || ''} onChange={(e) => setFormData({ ...formData, dataVisita: e.target.value })} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-gray-800" />
              </div>
              <div>
                <label className="block text-gray-700 font-semibold mb-2">Horário</label>
                <select required value={formData.horario || ''} onChange={(e) => setFormData({ ...formData, horario: e.target.value })} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-gray-800">
                  <option value="">Selecione</option>
                  {['08:00', '09:00', '10:00', '14:00', '15:00', '16:00'].map(h => <option key={h} value={h}>{h}</option>)}
                </select>
              </div>
              <button type="submit" className="w-full bg-purple-600 text-white py-3 rounded-lg font-semibold hover:bg-purple-700 transition-colors">Agendar Visita</button>
            </form>
          </div>
          <div className="lg:col-span-2 bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-xl font-bold text-gray-800 mb-4">Agendamentos</h3>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    {['Visitante', 'Data', 'Horário', 'Status'].map(h => (
                      <th key={h} className="px-4 py-3 text-left text-sm font-semibold text-gray-700">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {agendamentos.length === 0 ? (
                    <tr><td colSpan={4} className="px-4 py-8 text-center text-gray-500">Nenhum agendamento registrado</td></tr>
                  ) : (
                    agendamentos.map((ag: any) => (
                      <tr key={ag.id} className="hover:bg-gray-50">
                        <td className="px-4 py-3 text-sm text-gray-800">{ag.visitante}</td>
                        <td className="px-4 py-3 text-sm text-gray-600">{ag.dataVisita}</td>
                        <td className="px-4 py-3 text-sm text-gray-600">{ag.horario}</td>
                        <td className="px-4 py-3"><span className="px-3 py-1 bg-yellow-100 text-yellow-800 text-xs font-semibold rounded-full">{ag.status}</span></td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    );
  };

  if (currentPage === 'login') {
    return <LoginPage />;
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <Shield className="w-8 h-8 text-blue-600" />
              <span className="text-xl font-bold text-gray-800">Sistema Prisional</span>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-600">Administrador</span>
              <button onClick={handleLogout} className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors">
                <LogOut className="w-4 h-4" />
                Sair
              </button>
            </div>
          </div>
        </div>
      </nav>
      <div className="flex">
        <aside className="w-64 bg-white min-h-screen shadow-lg">
          <nav className="p-4">
            {[
              { page: 'dashboard', icon: Users, label: 'Dashboard' },
              { page: 'detentos', icon: Users, label: 'Detentos' },
              { page: 'visitantes', icon: UserPlus, label: 'Visitantes' },
              { page: 'agendamento', icon: Calendar, label: 'Agendamento' },
              { page: 'movimentacao', icon: ArrowRightLeft, label: 'Movimentação' },
              { page: 'advogados', icon: Briefcase, label: 'Visitas Advogado' },
            ].map(item => (
              <button
                key={item.page}
                onClick={() => setCurrentPage(item.page)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg mb-2 transition-colors ${currentPage === item.page ? 'bg-blue-600 text-white' : 'text-gray-700 hover:bg-gray-100'}`}
              >
                <item.icon className="w-5 h-5" />
                {item.label}
              </button>
            ))}
          </nav>
        </aside>
        <main className="flex-1">
          {currentPage === 'dashboard' && <Dashboard />}
          {currentPage === 'detentos' && <CadastroDetento />}
          {currentPage === 'visitantes' && <CadastroVisitante />}
          {currentPage === 'agendamento' && <Agendamento />}
          {currentPage === 'movimentacao' && <MovimentacaoInterna />}
          {currentPage === 'advogados' && <VisitasAdvogadoPage />}
        </main>
      </div>
    </div>
  );
};

export default SistemaPrisional;
